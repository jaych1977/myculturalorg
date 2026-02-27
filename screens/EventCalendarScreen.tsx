import React, { useState, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, DefaultEvents } from '../constants';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 600;

/**
 * Event Calendar Screen Component
 * Displays a calendar view of events throughout the year
 */
const EventCalendarScreen: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /**
   * Get number of days in a month
   */
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  /**
   * Get starting day of the month (0 = Sunday, 6 = Saturday)
   */
  const getStartingDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  /**
   * Get events for a specific date
   */
  const getEventsForDate = (day: number) => {
    return DefaultEvents.filter(event => {
      return (
        event.date.getDate() === day &&
        event.date.getMonth() === selectedMonth &&
        event.date.getFullYear() === selectedYear
      );
    });
  };

  /**
   * Generate calendar days for the month
   */
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const startingDay = getStartingDayOfMonth(selectedYear, selectedMonth);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [selectedMonth, selectedYear]);

  /**
   * Get events for the selected month
   */
  const monthEvents = useMemo(() => {
    return DefaultEvents.filter(
      event =>
        event.date.getMonth() === selectedMonth &&
        event.date.getFullYear() === selectedYear
    );
  }, [selectedMonth, selectedYear]);

  /**
   * Navigate to previous month
   */
  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  /**
   * Navigate to next month
   */
  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  /**
   * Render a day cell in the calendar
   */
  const renderDayCell = (day: number | null) => {
    if (day === null) {
      return (
        <View style={[styles.dayCell, styles.emptyDayCell]} />
      );
    }

    const eventsForDay = getEventsForDate(day);
    const isToday =
      day === new Date().getDate() &&
      selectedMonth === new Date().getMonth() &&
      selectedYear === new Date().getFullYear();

    return (
      <View
        key={`${day}`}
        style={[
          styles.dayCell,
          isToday && styles.todayCell,
          eventsForDay.length > 0 && styles.eventDayCell,
        ]}
      >
        <Text
          style={[
            styles.dayText,
            isToday && styles.todayText,
            eventsForDay.length > 0 && styles.eventDayText,
          ]}
        >
          {day}
        </Text>
        {eventsForDay.length > 0 && (
          <View style={styles.eventIndicator}>
            <MaterialCommunityIcons
              name="circle"
              size={6}
              color={Colors.accent}
            />
          </View>
        )}
      </View>
    );
  };

  /**
   * Render event item
   */
  const renderEventItem = ({ item }: { item: any }) => (
    <View style={styles.eventItem}>
      <View style={styles.eventDateBadge}>
        <Text style={styles.eventDay}>
          {item.date.getDate()}
        </Text>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.name}</Text>
        <Text style={styles.eventMonth}>
          {monthNames[item.date.getMonth()]} {item.date.getFullYear()}
        </Text>
        {item.location && (
          <Text style={styles.eventLocationBadge}>
            📍 {item.location}
          </Text>
        )}
      </View>
      {item.description && (
        <MaterialCommunityIcons
          name="information-outline"
          size={20}
          color={Colors.primary}
        />
      )}
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="calendar-range"
          size={32}
          color={Colors.primary}
        />
        <Text style={styles.title}>Event Calendar</Text>
      </View>

      {/* Month Navigation */}
      <View style={styles.monthNavigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={goToPreviousMonth}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <View style={styles.monthYearContainer}>
          <Text style={styles.monthYearText}>
            {monthNames[selectedMonth]} {selectedYear}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.navButton}
          onPress={goToNextMonth}
        >
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarCard}>
        {/* Day names header */}
        <View style={styles.dayNamesRow}>
          {dayNames.map(day => (
            <View key={day} style={styles.dayNameCell}>
              <Text style={styles.dayNameText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar days grid */}
        <View style={styles.daysGrid}>
          {calendarDays.map((day, index) => (
            <React.Fragment key={`cell-${index}`}>
              {renderDayCell(day)}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: Colors.accent }]} />
          <Text style={styles.legendText}>Has Event</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: Colors.secondary }]} />
          <Text style={styles.legendText}>Today</Text>
        </View>
      </View>

      {/* Events for selected month */}
      <View style={styles.eventsSection}>
        <View style={styles.eventsHeaderContainer}>
          <MaterialCommunityIcons
            name="calendar-check"
            size={24}
            color={Colors.primary}
          />
          <Text style={styles.eventsHeader}>
            {monthEvents.length} Event{monthEvents.length !== 1 ? 's' : ''} in {monthNames[selectedMonth]}
          </Text>
        </View>

        {monthEvents.length > 0 ? (
          <FlatList
            data={monthEvents}
            renderItem={renderEventItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={styles.eventSeparator} />
            )}
          />
        ) : (
          <View style={styles.noEventsContainer}>
            <MaterialCommunityIcons
              name="calendar-blank"
              size={48}
              color={Colors.gray}
            />
            <Text style={styles.noEventsText}>
              No events scheduled for {monthNames[selectedMonth]}
            </Text>
          </View>
        )}
      </View>

      {/* All Events for the year */}
      <View style={styles.allEventsSection}>
        <View style={styles.allEventsHeaderContainer}>
          <MaterialCommunityIcons
            name="list-box"
            size={24}
            color={Colors.primary}
          />
          <Text style={styles.allEventsHeader}>
            All Events - {selectedYear}
          </Text>
        </View>

        <FlatList
          data={DefaultEvents.filter(e => e.date.getFullYear() === selectedYear)}
          renderItem={renderEventItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View style={styles.eventSeparator} />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  title: {
    ...Typography.h2,
    color: Colors.primary,
    marginLeft: Spacing.md,
    fontWeight: 'bold',
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },
  navButton: {
    padding: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  monthYearContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  monthYearText: {
    ...Typography.h3,
    color: Colors.white,
    fontWeight: 'bold',
  },
  calendarCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dayNamesRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    paddingBottom: Spacing.sm,
  },
  dayNameCell: {
    flex: 1,
    alignItems: 'center',
  },
  dayNameText: {
    ...Typography.caption,
    color: Colors.gray,
    fontWeight: 'bold',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    padding: Spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
    marginBottom: Spacing.xs,
  },
  emptyDayCell: {
    backgroundColor: Colors.lightGray,
  },
  todayCell: {
    backgroundColor: Colors.secondary,
  },
  eventDayCell: {
    backgroundColor: '#FFE4E1',
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  dayText: {
    ...Typography.caption,
    color: Colors.black,
    fontWeight: 'bold',
  },
  todayText: {
    color: Colors.white,
  },
  eventDayText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  eventIndicator: {
    marginTop: Spacing.xs,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  legendIcon: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    ...Typography.small,
    color: Colors.gray,
  },
  eventsSection: {
    marginBottom: Spacing.lg,
  },
  eventsHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  eventsHeader: {
    ...Typography.h3,
    color: Colors.primary,
    marginLeft: Spacing.md,
    fontWeight: 'bold',
  },
  noEventsContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  noEventsText: {
    ...Typography.body,
    color: Colors.gray,
    marginTop: Spacing.md,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 8,
    gap: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  eventDateBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventDay: {
    ...Typography.h3,
    color: Colors.white,
    fontWeight: 'bold',
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    ...Typography.body,
    color: Colors.black,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  eventMonth: {
    ...Typography.small,
    color: Colors.gray,
  },
  eventLocationBadge: {
    ...Typography.small,
    color: Colors.secondary,
    marginTop: Spacing.xs,
  },
  eventSeparator: {
    height: Spacing.sm,
  },
  allEventsSection: {
    marginTop: Spacing.lg,
  },
  allEventsHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  allEventsHeader: {
    ...Typography.h3,
    color: Colors.primary,
    marginLeft: Spacing.md,
    fontWeight: 'bold',
  },
});

export default EventCalendarScreen;
