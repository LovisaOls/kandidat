import { View } from "native-base"
import { render } from "react-dom"
import React from "react"
import { Text,StyleSheet} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default function TestSchedule () {

    return (

<View>

<CalendarList
  // Callback which gets executed when visible months change in scroll view. Default = undefined
  onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={12}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={12}
  // Enable or disable scrolling of calendar list
  scrollEnabled={true}
  // Enable or disable vertical scroll indicator. Default = false
  showScrollIndicator={true}
 // Initially visible month. Default = Date()
 current={Date()}

 // Handler which gets executed on day press. Default = undefined
 onDayPress={(day) => {console.log('selected day', day)}}
 // Handler which gets executed on day long press. Default = undefined
 onDayLongPress={(day) => {console.log('selected day', day)}}
 // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
 monthFormat={'yyyy MM'}
 // Handler which gets executed when visible month changes in calendar. Default = undefined
 onMonthChange={(month) => {console.log('month changed', month)}}
 // Hide month navigation arrows. Default = false
 hideArrows={true}
 // Replace default arrows with custom ones (direction can be 'left' or 'right')
 renderArrow={(direction) => (<Arrow/>)}
 // Do not show days of other months in month page. Default = false
 hideExtraDays={true}
 // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
 // day from another month that is visible in calendar page. Default = false
 disableMonthChange={true}
 // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
 firstDay={1}
 // Hide day names. Default = false
 hideDayNames={false}
 // Show week numbers to the left. Default = false
 showWeekNumbers={true}
 // Handler which gets executed when press arrow icon left. It receive a callback can go back month
 onPressArrowLeft={subtractMonth => subtractMonth()}
 // Handler which gets executed when press arrow icon right. It receive a callback can go next month
 onPressArrowRight={addMonth => addMonth()}
 // Disable left arrow. Default = false
 disableArrowLeft={true}
 // Disable right arrow. Default = false
 disableArrowRight={true}
 // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
 disableAllTouchEventsForDisabledDays={true}
 // Replace default month and year title with custom one. the function receive a date as parameter.
 renderHeader={(date) => {/*Return JSX*/}}
 // Enable the option to swipe between months. Default = false
 enableSwipeMonths={true}

/>
        </View>
    );
    };

