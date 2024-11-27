

const LoggedOutCard = () => {

    const styles: {[key: string]: React.CSSProperties} = {
        mainDiv: {
            padding: '10px',
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.6)',
            color: 'rgba(100, 200, 200, 0.9)',
        }
    }

    return (
        <div style={styles.mainDiv}>
            <h1>Please Login</h1>
        </div>
    )
};

export default LoggedOutCard