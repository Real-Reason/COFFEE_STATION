import React from 'react';
import { Pressable, Text } from 'react-native';


const CartItems = props => {
    console.log(props)
    return (
      <Pressable
        style={{
          backgroundColor: '#aaaaaa',
          borderRadius: 8,
          padding: 10,
        }}
        delayLongPress = {3000}
        onLongPress = {() => alert('long press')}
        onPress={() => props.onPress()}
        // hitSlop={50}
      >
        <Text 
          style={{ 
            fontSize:24, 
            color:'white' 
          }}
        >
          { props.title }
        </Text>
      </Pressable>
    )
  }
  
CartItems.defaultProps = {
  title: 'Button',
};


export default CartItems;