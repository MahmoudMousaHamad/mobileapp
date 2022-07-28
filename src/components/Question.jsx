/* eslint-disable react/prop-types */

import { CheckBox, Datepicker, IndexPath, Input, Layout, Radio, RadioGroup, Select, SelectItem, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
  
const questionTypeInput = {
    text: {
      element: (handleChange, value = '', handleSubmit) => 
        <Input
          style={{ minWidth: 200 }}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          size='large'
          placeholder='Your answer...' 
          onChangeText={handleChange} 
          value={value.toString()} />,
    },
    textarea: {
      element: (handleChange, value) => 
        <Input 
          placeholder='Your answer...' 
          multiline={true} 
          onChangeText={handleChange} 
          value={value} />,
    },
    number: {
      element: (handleChange, value) => 
        <Input
          style={{ minWidth: 200 }}
          type="number" 
          placeholder='Your answer...' 
          onChangeText={handleChange} 
          value={value} />,
    },
    date: {
      element: (handleChange, value = new Date()) => {
        // const date = new Date(value);
        // const showDate = typeof value === "string" ? 
        //   new Date(date.valueOf() + 24*60*60*2)
        //   : value;
        // console.log(showDate.getFullYear);
        const now = new Date();
        const max = new Date(now.getFullYear() + 100, 12, 31);
        return (
          <Datepicker 
            date={value}
            onSelect={handleChange}
            max={max} />
        );
      }
    },
    radio: {
      element: (options, handleChange, index) =>
        <RadioGroup
            selectedIndex={index}
            onChange={handleChange}>
            {
                options.map((option, index) => (
                    <Radio key={index}>{option}</Radio>
                ))
            }
        </RadioGroup>
        
    },
    select: {
      element: (options, handleChange, index = null) => 
        <Select 
            selectedIndex={new IndexPath(index)}
            onSelect={index => handleChange(index.row)} 
            value={index ? options[index] : "Select an option..."}
            size="large">
            { options.map((option, index) => <SelectItem key={index} title={option} /> ) }
        </Select>
    },
    checkbox: {
      element: (options, handleChange, checked = []) => 
        options.map((option, index) => (
            <CheckBox 
                key={index}
                checked={checked.includes(index)} 
                onChange={() => {
                  if (checked.includes(index)) {
                    checked.splice(checked.indexOf(index));
                  } else {
                    checked.push(index);
                  }
                  handleChange([...checked]);
                }}>
                    {option}
            </CheckBox>
        ))
    },
};
  
function constructInput(type, options, handleChange, answer, handleSubmit) {
    if (options === "None") {
      return questionTypeInput[type].element(handleChange, answer, handleSubmit);
    }
    return questionTypeInput[type].element(options, handleChange, answer, handleSubmit);
}
  
export default ({ question, handleChange, answer, handleSubmit }) => {
    const { text, type, options } = question;
    
    const InputElement = constructInput(type, options, handleChange, answer, handleSubmit);
  
    return (
      <Layout style={styles.container}>
        <Text category='label' style={text.length > 200 ? styles.longText : styles.text}>{text}</Text>
        <Layout>
            {InputElement}
        </Layout>
      </Layout>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    minWidth: 200,
    marginBottom: 10,
  },
  longText: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
    lineHeight: 2,
    minWidth: 200,
  }
});
  