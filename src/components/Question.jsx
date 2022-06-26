/* eslint-disable react/prop-types */

import { CheckBox, IndexPath, Input, Layout, Radio, RadioGroup, Select, SelectItem, Text } from '@ui-kitten/components';

  
const questionTypeInput = {
    text: {
      element: (handleChange, value = '') => 
        <Input 
        placeholder='Your answer...' 
        onChangeText={handleChange} 
        value={value} />,
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
    radio: {
      element: (options, handleChange, index = 0) =>
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
      element: (options, handleChange, index = new IndexPath(0)) => 
        <Select 
            selectedIndex={index}
            onSelect={index => handleChange(index.row)}>
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
      <Layout>
        <Text>{text}</Text>
        <Layout>
            {InputElement}
        </Layout>
      </Layout>
    );
};
  