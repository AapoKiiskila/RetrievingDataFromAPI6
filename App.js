import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import PickerComponent from './components/PickerComponent.js'
import useFetch from './hooks/useFetch'

const URL = 'https://api-web.nhle.com/v1/club-stats/'

export default function App() {
  const[team, setTeam] = useState(null)

  const url = team ? URL + team + "/now" : null
  const { data, error, loading } = useFetch(url)

  
  const scoringLeader = data !== null && data.skaters ? data.skaters.reduce((max, current) =>
    max.points > current.points ? max : current
  ) : null

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text style={styles.text}>Get the scoring leader of your favorite NHL team!</Text>
      <PickerComponent team={team} setTeam={setTeam} />
      {loading &&
        <ActivityIndicator size='large' />
      }
      {error && loading !== true &&
        <Text style={styles.text}>Error, try again later</Text>
      }
      {scoringLeader !== null && loading !== true &&
        <View>
          <Text style={styles.text}>Player: {scoringLeader.firstName.default} {scoringLeader.lastName.default}</Text>
          <Text style={styles.text}>Games played: {scoringLeader.gamesPlayed}</Text>
          <Text style={styles.text}>Goals: {scoringLeader.goals}</Text>
          <Text style={styles.text}>Assists: {scoringLeader.assists}</Text>
          <Text style={styles.text}>Total points: {scoringLeader.points}</Text>
          <Text style={styles.text}>Plus/Minus rating: {scoringLeader.plusMinus}</Text>
          <Text style={styles.text}>Penalty minutes: {scoringLeader.penaltyMinutes}</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16
  }
})
