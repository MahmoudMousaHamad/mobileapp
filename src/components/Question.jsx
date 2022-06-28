/* eslint-disable react/prop-types */

import { CheckBox, Datepicker, IndexPath, Input, Layout, Radio, RadioGroup, Select, SelectItem, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
  
const questionTypeInput = {
    text: {
      element: (handleChange, value = '') => 
        <Input
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
        return (
          <Datepicker 
            date={value} 
            onSelect={handleChange} />
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
      element: (options, handleChange, checked = {}) => 
        options.map((option, index) => (
            <CheckBox 
                key={index}
                checked={(typeof checked === 'object' && checked !== null) 
                    ? checked[index.toString()] : false} 
                onChange={v => handleChange({ ...checked, [index.toString()]: v })}>
                    {option}
            </CheckBox>
        ))
    },
};
  
function constructInput(type, options, handleChange, answer) {
    if (options === "None") {
      return questionTypeInput[type].element(handleChange, answer);
    }
    return questionTypeInput[type].element(options, handleChange, answer);
}
  
export default ({ question, handleChange, answer }) => {
    const { text, type, options } = question;
    
    const InputElement = constructInput(type, options, handleChange, answer);
  
    return (
      <Layout style={styles.container}>
        <Text category='label' style={styles.text}>{text}</Text>
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
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
    lineHeight: 2,
  }
});
  