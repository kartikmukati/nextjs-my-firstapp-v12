const UserProfilePage = ( props ) => {
    const { userName } = props;
    return (
        <div>
            <h1>{userName}</h1>
        </div>
    )
}

export default UserProfilePage;

export async function getServerSideProps(context) {

    const {params, req, res} = context;

    console.log("Hii")

    return {
        props: {
            userName: 'Kartik'
        }
    }
}