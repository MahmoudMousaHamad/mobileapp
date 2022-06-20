import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


export default ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}