import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuContext } from './AtualizaIcon';

const FooterMenu = () => {
  const { activeTab, setMenuActiveTab } = useContext(MenuContext);
  const navigation = useNavigation();

  const handleTabPress = (tab) => {
    setMenuActiveTab(tab);

    if (tab === 'home') {
      navigation.navigate('Homepage');
    } else if (tab === 'list') {
      navigation.navigate('Eventlist');
    } else if (tab === 'profile') {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={[styles.container, styles.shadowContainer]}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('home')}
      >
        <Image
          source={require('../assets/home.png')}
          style={[
            styles.icon,
            activeTab === 'home' && styles.activeIcon,
          ]}
        />
        {activeTab === 'home' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('list')}
      >
        <Image
          source={require('../assets/lista.png')}
          style={[
            styles.icon,
            activeTab === 'list' && styles.activeIcon,
          ]}
        />
        {activeTab === 'list' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('profile')}
      >
        <Image
          source={require('../assets/profile.png')}
          style={[
            styles.icon,
            activeTab === 'profile' && styles.activeIcon,
          ]}
        />
        {activeTab === 'profile' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  shadowContainer: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  tab: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#807DFF',
    marginTop: 4,
  },
});

export default FooterMenu;










 


// import React, { useState } from 'react';
// import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
  

// const FooterMenu = ({navigation}) => {
//   const [activeTab, setActiveTab] = useState('home');


//   const handleTabPress = (tab) => {
//     setActiveTab(tab);

//     // if (tab === 'home') {
//     //   navigation.navigate('Homepage');   {/*  onPress={() => handleTabPress('home')} */}
//     // } else if (tab === 'list') {
//     //   navigation.navigate('List');
//     // } else if (tab === 'profile') {    {/* onPress={() => handleTabPress('profile')}*/}
//     //   navigation.navigate('Profile');
//     // }   
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.tab}
   
//       >   


//         <Image
//           source={require('../assets/home.png')}
//           style={[
//             styles.icon,
//             activeTab === 'home' && styles.activeIcon,
//           ]}
//         />
//         {activeTab === 'home' && <View style={styles.activeIndicator} />}
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.tab}
//         onPress={() => handleTabPress('list')}
//       >
//         <Image
//           source={require('../assets/lista.png')}
//           style={[
//             styles.icon,
//             activeTab === 'list' && styles.activeIcon,
//           ]}
//         />
//         {activeTab === 'list' && <View style={styles.activeIndicator} />}
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.tab}
       
//       >



//         <Image
//           source={require('../assets/profile.png')}
//           style={[
//             styles.icon,
//             activeTab === 'profile' && styles.activeIcon,
//           ]}
//         />
//         {activeTab === 'profile' && <View style={styles.activeIndicator} />}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     height: 60,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   tab: {
//     alignItems: 'center',
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
//   activeIndicator: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#807DFF',
//     marginTop: 4,
//   },
// });

// export default FooterMenu;