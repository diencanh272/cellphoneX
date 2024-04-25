import queryString from 'query-string';
import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
        req.body.updatedAt = Date.now();
    } else if (req.method === 'PATCH' || req.method === 'PUT') {
        req.body.updatedAt = Date.now();
    }
    next();
});
router.render = (req, res) => {
    const headers = res.getHeaders();
    const totalCount = headers['x-total-count'];
    console.log(req);
    console.log(totalCount);
    if (req.originalMethod === 'GET' && totalCount) {
        const queryParams = queryString.parse(req._parsedOriginalUrl.query);
        const result = {
            data: res.locals.data,
            pagination: {
                _page: Number.parseInt(queryParams._page) || 1,
                _limit: Number.parseInt(queryParams._limit) || 10,
                _totalRows: Number.parseInt(totalCount),
            },
        };
        return res.jsonp(result);
    }
    res.jsonp(res.locals.data);
};

// Middleware để tự động tăng id và cập nhật lại id
server.use((req, res, next) => {
    if (req.method === 'POST') {
        // Lấy danh sách đối tượng từ db.json
        const data = router.db.get(req.path).value();
        // Tìm id lớn nhất trong danh sách đối tượng
        const maxId = data.length > 0 ? data.reduce((max, obj) => (obj.id > max ? obj.id : max), 0) : 0;
        // Tăng id lớn nhất lên 1 để tạo id mới cho đối tượng tiếp theo
        req.body.id = maxId + 1;
    } else if (req.method === 'DELETE') {
        const idToDelete = parseInt(req.params.id);
        const data = router.db.get(req.path).value();
        const updatedData = data.filter((obj) => obj.id !== idToDelete);
        // Cập nhật lại id cho danh sách đối tượng sau khi xóa
        updatedData.forEach((obj, index) => {
            obj.id = index + 1;
        });
        router.db.set(req.path, updatedData).write();
    }
    // Tiếp tục chuyển tiếp request
    next();
});

// Use default router
server.use('/api', router);
server.listen(8009, () => {
    console.log('JSON Server is running');
});
