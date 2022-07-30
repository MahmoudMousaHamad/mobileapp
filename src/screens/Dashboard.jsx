import CircularProgress from "react-native-circular-progress-indicator";
import { Layout, Text, Toggle } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendData } from "../actions/data";

const Dashboard = () => {
    const { 
        "bot-status-change": botStatus,
        "application-counts": counts,
    } = useSelector((state) => state.data);

    const [checked, setChecked] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Getting application counts");
        dispatch(sendData("get-application-counts"));
    }, [checked]);

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
            justifyContent: "space-around", 
            padding: 50, 
            height: "100%" 
        }}>
            <Layout style={{ 
                display: "flex",
                alignItems: "center",
                justifyContent: "center", 
            }}>
                <Text category="p1" style={{marginBottom: 10}}>
                    Use this switch to toggle the bot running on your computer
                </Text>
                <Toggle checked={checked} onChange={onCheckedChange}></Toggle>
            </Layout>
            <Layout style={{ marginBottom: 0 }}>
                {/* {counts && <Text category="h5">Submissions: {counts?.count} / {counts?.limit}</Text>}
                <Layout style={{display: "flex", alignItems: "stretch"}}>
                    <Layout style={{ minWidth: 50, backgroundColor: "black" }}>
                        
                    </Layout>
                </Layout> */}

                <CircularProgress
                    value={counts?.count}
                    maxValue={counts?.limit}
                    title={` / ${counts?.limit}`}
                    progressValueColor="black"
                    inActiveStrokeColor="#054DA7"
                    inActiveStrokeOpacity={0.5}
                    activeStrokeColor="#054DA7"
                    radius={100}
                    duration={2000}
                    delay={1000}
                />
            </Layout>
        </Layout>
    );
};

export default Dashboard;
