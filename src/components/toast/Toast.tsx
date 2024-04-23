import './assets/styles.css';
export const Toast = ({ message, type }) => {
    return (
        <div className={`toast toast-${type}`}>
            {message}
        </div>
    );
}