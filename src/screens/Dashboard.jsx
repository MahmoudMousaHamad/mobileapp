import { Layout, Text } from "@ui-kitten/components";

const Dashboard = () => {
    return (
        <Layout style={{ 
            display: "flex",
            alignItems: "center",
            justifyContent: "center", 
            padding: 50, 
            height: "100%" 
        }}>
            <Text>Control the bot running on your computer</Text>
        </Layout>
    );
};

export default Dashboard;
