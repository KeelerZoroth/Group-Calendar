import { GroupData } from "../interfaces/GroupData";

const GroupCard = (props: { group: GroupData }) => {
    const { group } = props;

    const styles: {[key: string]: React.CSSProperties} = {
        mainDiv: {
            color: 'white',
            background: 'rgb(0, 0, 0)',
            display: 'block',
            padding: "1px 0px",
            width: '100%',
        },
        subDiv: {
            margin: '10px',
            wordBreak: 'break-all',
        },
        h3: {
            display: 'inline-block',
            paddingRight: '10px',
            margin: '0px',
        },
        p: {
            display: 'inline-block',
            padding: '0px',
            margin: '0px',
        }
    }
    

    return ( <div style={styles.mainDiv}>
        <div style={styles.subDiv}>
            <h3 style={styles.h3}>Name:</h3>
            <p style={styles.p}>{group.groupName}</p>
        </div>
        <div style={styles.subDiv}>
            <h3 style={styles.h3}>Host:</h3>
            <p style={styles.p}>{group.hostUser?.username}</p>
        </div>
    </div> )
}

export default GroupCard