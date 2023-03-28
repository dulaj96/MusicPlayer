import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import songs from '../../components/Data';

const {width, height} = Dimensions.get('window');

const MusicPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const songSlider = useRef(null);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      console.log('scrollX', scrollX);
      const index = Math.round(value / width);
      setSongIndex(index);
      console.log('Index', index);
    });
    return () => {
      scrollX.removeAllListeners();
    }
  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  }
  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  }

  const renderSongs = ({index, item}) => {
    return (
      <Animated.View
        style={{
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.artworkWrapper}>
          <Image source={item.image} style={styles.artworkImg} />
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#222831" barStyle="light-content" />

      <View style={styles.mainContainer}>
        <View style={{width: width}}>
          <Animated.FlatList
            ref={songSlider}
            renderItem={renderSongs}
            data={songs}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x: scrollX},
                  },
                },
              ],
              {useNativeDriver: true},
            )}
          />
        </View>

        <View>
          <Text style={styles.title}>{songs[songIndex].title}</Text>
          <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        </View>

        <View>
          <Slider
            style={styles.progressContainer}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFF"
            onSlidingComplete={() => {}}
          />
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabelTxt}>0:00</Text>
            <Text style={styles.progressLabelTxt}>3:22</Text>
          </View>
        </View>

        <View style={styles.musicControls}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Icon
              name="play-skip-back-outline"
              color="#FFD369"
              size={35}
              style={{marginTop: 25}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="ios-pause-circle" color="#FFD369" size={75} />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Icon
              name="play-skip-forward-outline"
              color="#FFD369"
              size={35}
              style={{marginTop: 25}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons
              name="heart-outline"
              color="#777777"
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons name="repeat" color="#777777" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <MaterialIcons name="ios-share" color="#777777" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <FontAwesome name="ellipsis-h" color="#777777" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artworkWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },
  artworkImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#EEEEEE',
  },
  artist: {
    fontSize: 14,
    fontWeight: '100',
    textAlign: 'center',
    color: '#EEEEEE',
    marginTop: 5,
  },
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340,
  },
  progressLabelTxt: {
    color: '#fff',
  },
  musicControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 15,
  },
  bottomContainer: {
    borderTopColor: '#393E46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default MusicPlayer;
