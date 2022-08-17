/* eslint-disable react/display-name */
import React from "react";
import { Button, Layout, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector, useStore } from "react-redux";
import { clearData, sendData } from "../actions/data";

import useSetupNotification from "../useSetupNotification";
import Question from "../components/Question";
import useAppState from "../useAppState";
import Socket from "../Socket";
import config from "../config";

export default () => {
	// const { question } = useSelector((state) => state.data);
	const { questions } = useSelector((state) => state.data);

	const [answers, setAnswers] = useState(
		Array(questions?.length).fill(null)
	);
	const [errors, setErrors] = useState();
	const dispatch = useDispatch();
	const store = useStore();

	useEffect(() => {
		if (!Socket.isConnected) {
			Socket.connect(config.SERVER_ENDPOINT, store);
		}
	});

	useEffect(() => {
		setAnswers(Array(questions?.length).fill(null));
		setErrors();
	}, [questions]);

	useSetupNotification();
	useAppState();

	function handleChange(value, index) {
		answers[index] = value;
		setAnswers([...answers]);
	}

	function handleSubmit() {
		const err = answers
			? answers?.map((answer) => !(answer || answer === 0))
			: Array(questions?.length).fill(true);
		if (err?.every((error) => !error)) {
			dispatch(sendData("answers", answers));
			dispatch(clearData("questions"));
			setErrors(err);
			setAnswers();
		}
	}

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "white",
			}}
		>
			{!questions && (
				<Text>If a questoin needs your attention, it will show up here</Text>
			)}
			{questions && (
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{questions.map((question, index) => (
						<Layout key={index}>
							<Question
								question={question}
								handleChange={(value) => handleChange(value, index)}
								handleSubmit={handleSubmit}
								answer={answers?.[index]}
							/>
							{errors?.[index] && (
								<Text style={{ color: "red" }}>Please answer the question</Text>
							)}
						</Layout>
					))}
					<Button style={{ marginBottom: 10 }} onPress={handleSubmit}>
            			Submit
					</Button>
				</ScrollView>
			)}
		</View>
	);
};
