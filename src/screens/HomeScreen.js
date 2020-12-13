import React , {Component} from 'react';

import styles from '../styles/style';
import Entry from '../components/Entry';
import { View, FlatList,StyleSheet,Button } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

class HomeScreen extends Component {
constructor () {
super();
this.state = {
entries: [],
};
this.toDetails = this.toDetails.bind(this);
this.handleDelete = this.handleDelete.bind(this);
}

toDetails(item) {
this.props.navigation.navigate('Details',item);
}

componentDidMount(){
fetch ('https://protected-spire-82809.herokuapp.com/entries').then(response => response.json()).then(jsonResponse => this.setState( { entries: jsonResponse}));
}

componentWillReceiveProps() {
    this.componentDidMount();
}

handleDelete() {
fetch('https://protected-spire-82809.herokuapp.com/delete', {
method: 'DELETE'
}).then(response => {
    this.props.navigation.navigate('Feed');
});

}


render(){

return (
<View style ={styles.container} >

<FlatList
data = {this.state.entries}
renderItem = { ({item}) => <Entry item = {item} toDetails={this.toDetails} />}
keyExtractor = {item => item['_id']}
/>

<Button title='DELETE'
color='red'
onPress = {() => this.handleDelete()} />


  <FontAwesome name='remove' onPress = {() => this.handleDelete()}  color ='red' size ={25}/>


</View>

);

}
}


export default HomeScreen
