import React from 'react';
import { StyleSheet, TouchableOpacity, View, StatusBar, Alert, Text, Button, } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount() {
    this.InitializeGame();
  }
  
  InitializeGame = () => {
    this.setState({gameState:
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
    });
  }

  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;

    for(var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    for(var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    return 0;
  }

  onTilePress = (row, col) => {
    var value = this.state.gameState[row][col];
    if (value !== 0) { return; }

    var currentPlayer = this.state.currentPlayer;

    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    var winner = this.getWinner();
    if (winner == 1) { 
      Alert.alert('Player 1 wins');
      this.InitializeGame();
    } else if (winner == -1) {
      Alert.alert('Player 2 wins');
      this.InitializeGame();
    }
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name="close" style={styles.xTile} />;
      case -1: return <Icon name="circle-outline" style={styles.oTile} />;
      default: return <View />;
    }
  }

  render() {
    return (
      <View style={styles.container} >
      <Text style={styles.head}>Tic Tac Toe</Text>
      <StatusBar hidden={true} />

        <View style={styles.middle}>
          <TouchableOpacity onPress={() => this.onTilePress(0,0)} style={[styles.cross, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,1)} style={[styles.cross, {borderTopWidth: 0}]}>
            {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,2)} style={[styles.cross, {borderTopWidth: 0, borderRightWidth: 0}]}>
            {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>

        <View style={styles.middle}>
          <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.cross, {borderLeftWidth: 0}]}>
            {this.renderIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,1)} style={styles.cross}>
            {this.renderIcon(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.cross, { borderRightWidth: 0}]}>
            {this.renderIcon(1,2)}
          </TouchableOpacity>
        </View>

        <View style={styles.middle}>
          <TouchableOpacity onPress={() => this.onTilePress(2,0)} style={[styles.cross, {borderBottomWidth: 0, borderLeftWidth: 0}]}>
            {this.renderIcon(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,1)} style={[styles.cross, {borderBottomWidth: 0}]}>
            {this.renderIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,2)} style={[styles.cross, {borderBottomWidth: 0, borderRightWidth: 0}]}>
            {this.renderIcon(2,2)}
          </TouchableOpacity>
        </View>

        <View style={styles.button} >
          <Button title="New Game" onPress={() => this.InitializeGame()} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff8d8',
  },
  cross: {
    borderColor: "black",
    borderWidth: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  xTile: {
    color: 'red',
    fontSize: 75,
  },
  oTile: {
    color: 'green',
    fontSize: 75,
  },
  head: {
    marginBottom: '25%',
    fontSize: 45,
  },
});
