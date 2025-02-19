import { Picker } from '@react-native-picker/picker'
import { StyleSheet } from 'react-native'
import React from 'react'
import teams from './teams.js'

export default function PickerComponent({team, setTeam}) {
    return (
        <Picker
            style={styles.picker}
            selectedValue={team}
            onValueChange={(itemValue, itemIndex) =>
                setTeam(itemValue)
            }
        >
            <Picker.Item label="Select a team..." value='' enabled={false} />
            {
                teams.map(item => (
                    <Picker.Item
                        style={styles.item}
                        key={item.value}
                        label={item.label}
                        value={item.value}
                    />
                ))
            }
        </Picker>
    )
}

const styles = StyleSheet.create({
    picker : {
      width: '100%'
    }
})
