import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react'
import theme from '../../style/colors';

const PaymentListComponent = ({icon,title,description,onPress}) => {
  return (
    <TouchableOpacity  style={styles.optionContainer} onPress={onPress}>
      <View style={styles.option}>
        <Image source={{ uri: icon }} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Text style={styles.arrow}> 
            <Image resizeMode='contain' style={styles.icon} source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAZlBMVEX///8AAAABAQG1tbVxcXGioqLKysqoqKgSEhL6+vrPz8/p6en19fUdHR3Hx8c2NjZiYmIMDAzj4+NaWlpEREQjIyNQUFA8PDyamporKyuHh4fv7+/W1ta9vb1sbGxLS0t8fHySkpKVTGP4AAAEWUlEQVR4nO2b23aqQAyGDaDCIDCcQTn5/i+5YQ7KsKvVFkkv8vWiS1oXMZn8yWRwtyMIgiAIgiAIgiAIgiAIgvhznI4O506VYNsxI+GgyEJsWzR2PppjiR+ACtsayfFmkjArPWEbNMJisEam4Mnf6QXbpJ1XSz9BoIMIFvp6t6V/8iNr2kI4a7TvgGxUKvyTyYV0BuEpABvVJr8cnQMuUy8rvbBQk5AF0wrnnn7d6oU14Nm0C6fcg252IVcLi+NJw9JTY0Bz5avMxzIqEWsqaGaXLlz5KmIP3/ZhUlHzipmrdl6nfJVjVcKj9EphxOqWhEccozxXCBPUhozvAbc+h/LuYBmxGrNSurDzHr3xo4yx6qPRKteQcZGWk7UDjjRUkHJhwHV+1deVkON0DS3n0i2DYZUsixEfcLqGplaxSo0kFPW57tIep2tIAiUCvREr2TUAljR4jqrEtZGEtqV2FOc3k/ASHldgHwhXWRAbsWpdJaPOO5+wzWA11NZhP79Botvl7OUkvO/YVjBJsbQqU9JQvpiETXDfHc22SW++XP5tjJUhmKneWryUhH59+3irMhaXeay8s0rN4JXWvdBlc31yI1aVvtH+kSk3Wl0zq/3qVKYy2aDuNXxnlJSWONyijh9ckELqPE/CJJo6WavdwKSd6Julr/qnrTsTpmfb2CS7BuGrrHnyX0xYPmxkk2jdVW4+kQbpqXfk/3ckhSrP9RMVbaYgQ7lVu8oC+ELDlviZMHyjriJUxQO65+3xIFwF1Rbt6l5vur6TT6bSoXfWpzsbt6oAvuggvmT4XJnp5vc5cV2SX9jIXzL4SEVeNJonrmJXv9QmnIrPtC5mQxUrPxUvjmEu5/UidveTUblYrerLG1Pj5FxEgft78lh7rDYWzg9He17CDr+G2VobTb2uLHX5+uj2H6TJQOoLX25HhZ9ijHHxAXTDONdrT8/0XIzpWavbkutcCnxdgXOEYYJX9VxWLEMKGt3WpRgTWQfSfnJIYEhBqHehHGFs5g1Kp0wpsHUFvmKM8o7KIaXR5e61PKEMPS964RhpN6irsNG2ZIFsSsAxKrCjkjHAGaR7Bfw36PEj5acM6TQymebCEM3vPu3w5KwR64T04C5Ose7ivt0+ack0xDf6TDtWTdWAM9WfaKbj7HvqeVclBRbSqYxAHtfe9rxaSJEPkTu5qoVyThU4rvMBomfjgg0IZTVxz3Z7nTKxd1LuoJ2JavREU/bpUKcdRpO5YFzqsvLK7qUojn/iYZfZJmtUcdwlfoNl2k1oFfgLvKqMZUs1oC/xGV54rK77Fv8hJYIgCIIgCIIgCIIgCIIgCIL4KfYfZLfaM2UrslMPp8H9ew2feErwIUt7xMWdPGdySlY6EU/7NHWN73+v9qDgg5dxHQRuHJVxHmVRGQXiovAUpCz0K58dLmHDyi1dNUYoS7s064OSZ3UUyWNC6ang0Cbnhp2ZzQ7Rpp4S3+WOR1wdv/HnH25SOwgrs3PxAAAAAElFTkSuQmCC" }} />
        </Text> 
      </View>
    </TouchableOpacity>
  )
}

export default PaymentListComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.colors.textLight,
  },
  optionContainer: {
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textLightGray,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gridColor, // Placeholder for icon background
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.infoText,
  },
  description: {
    fontSize: 14,
    color: theme.colors.infoText,
  },
  arrow: {
    fontSize: 18,
    color: theme.colors.infoText,
  },
});