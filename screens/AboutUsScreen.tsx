import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, AboutUsContent } from '../constants';
import { DefaultEvents } from '../constants';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 600;

/**
 * About Us Screen Component
 * Displays organization information, mission, vision, and event pictures
 */
const AboutUsScreen: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('description');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderSectionHeader = (
    title: string,
    sectionId: string,
    icon: string
  ) => (
    <TouchableOpacity
      style={styles.sectionHeader}
      onPress={() => toggleSection(sectionId)}
    >
      <View style={styles.headerContent}>
        <MaterialCommunityIcons
          name={icon as any}
          size={24}
          color={Colors.primary}
          style={styles.headerIcon}
        />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <MaterialCommunityIcons
        name={
          expandedSection === sectionId
            ? 'chevron-up'
            : 'chevron-down'
        }
        size={24}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );

  const renderEventCard = ({ item }: { item: any }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventImagePlaceholder}>
        <MaterialCommunityIcons
          name="calendar-multiple"
          size={40}
          color={Colors.accent}
        />
      </View>
      <View style={styles.eventInfo}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventDate}>
          {item.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        {item.location && (
          <Text style={styles.eventLocation}>
            📍 {item.location}
          </Text>
        )}
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoPlaceholder}>
          <MaterialCommunityIcons
            name="theater-masks"
            size={64}
            color={Colors.white}
          />
        </View>
        <Text style={styles.mainTitle}>
          {AboutUsContent.title}
        </Text>
        <Text style={styles.subtitle}>
          {AboutUsContent.subtitle}
        </Text>
      </View>

      {/* Description Section */}
      {renderSectionHeader('About Us', 'description', 'information')}
      {expandedSection === 'description' && (
        <View style={styles.sectionContent}>
          <Text style={styles.descriptionText}>
            {AboutUsContent.description}
          </Text>
        </View>
      )}

      {/* Mission Section */}
      {renderSectionHeader('Our Mission', 'mission', 'target')}
      {expandedSection === 'mission' && (
        <View style={styles.sectionContent}>
          <Text style={styles.missionText}>
            {AboutUsContent.mission}
          </Text>
        </View>
      )}

      {/* Vision Section */}
      {renderSectionHeader('Our Vision', 'vision', 'eye')}
      {expandedSection === 'vision' && (
        <View style={styles.sectionContent}>
          <Text style={styles.visionText}>
            {AboutUsContent.vision}
          </Text>
        </View>
      )}

      {/* Upcoming Events Section */}
      {renderSectionHeader('Upcoming Events', 'events', 'calendar')}
      {expandedSection === 'events' && (
        <View style={styles.sectionContent}>
          <FlatList
            data={DefaultEvents}
            renderItem={renderEventCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={styles.eventSeparator} />
            )}
          />
        </View>
      )}

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Get In Touch</Text>
        <View style={styles.contactItem}>
          <MaterialCommunityIcons
            name="email"
            size={20}
            color={Colors.primary}
          />
          <Text style={styles.contactText}>contact@myculturalorg.com</Text>
        </View>
        <View style={styles.contactItem}>
          <MaterialCommunityIcons
            name="phone"
            size={20}
            color={Colors.primary}
          />
          <Text style={styles.contactText}>+91 1234-567-890</Text>
        </View>
        <View style={styles.contactItem}>
          <MaterialCommunityIcons
            name="map-marker"
            size={20}
            color={Colors.primary}
          />
          <Text style={styles.contactText}>123 Cultural Street, City, Country</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Copyright © 2026 My Cultural Organisation. All rights reserved.
        </Text>
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
    paddingBottom: Spacing.xl,
  },
  headerSection: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  mainTitle: {
    ...Typography.h1,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.accent,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    marginRight: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.primary,
    flex: 1,
  },
  sectionContent: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  descriptionText: {
    ...Typography.body,
    color: Colors.black,
    lineHeight: 24,
  },
  missionText: {
    ...Typography.body,
    color: Colors.black,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  visionText: {
    ...Typography.body,
    color: Colors.black,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  eventImagePlaceholder: {
    width: isSmallScreen ? 80 : 100,
    height: isSmallScreen ? 80 : 100,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  eventName: {
    ...Typography.h3,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  eventDate: {
    ...Typography.caption,
    color: Colors.gray,
    marginBottom: Spacing.xs,
  },
  eventLocation: {
    ...Typography.caption,
    color: Colors.secondary,
    marginBottom: Spacing.xs,
  },
  eventDescription: {
    ...Typography.caption,
    color: Colors.gray,
  },
  eventSeparator: {
    height: Spacing.md,
  },
  contactSection: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.accent,
    borderRadius: 8,
  },
  contactTitle: {
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  contactText: {
    ...Typography.body,
    color: Colors.black,
    marginLeft: Spacing.md,
    flex: 1,
  },
  footer: {
    marginTop: Spacing.xl,
    padding: Spacing.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  footerText: {
    ...Typography.small,
    color: Colors.white,
    textAlign: 'center',
  },
});

export default AboutUsScreen;
