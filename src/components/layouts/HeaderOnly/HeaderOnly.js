import HeaderMain from '../Header/HeaderMain/HeaderMain';

function HeaderOnly({ children }) {
    return (
        <div>
            <HeaderMain />
            {children}
        </div>
    );
}

export default HeaderOnly;
