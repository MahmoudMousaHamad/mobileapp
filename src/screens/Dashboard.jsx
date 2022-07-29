import { Layout, Text, Toggle } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendData } from "../actions/data";

const Dashboard = () => {
    const { "bot-status-change": botStatus } = useSelector((state) => state.data);
    const [checked, setChecked] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        setChecked(botStatus === "start");
    }, [botStatus]);

    const onCheckedChange = (isChecked) => {
        setChecked(isChecked);
        dispatch(sendData("set-bot-status", { 
            status: isChecked ? "start" : "stop",
            source: "mobile",
        }));
    };

    return (
        <Layout style={{ 
            display: "flex",
            alignItems: "center",
            justifyContent: "center", 
            padding: 50, 
            height: "100%" 
        }}>
            <Text>Control the bot running on your computer</Text>
            <Toggle checked={checked} onChange={onCheckedChange}></Toggle>
        </Layout>
    );
};

export default Dashboard;
