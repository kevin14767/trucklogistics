// app/(app)/home.tsx
import React from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from '@/src/context/ThemeContext';
import { getThemeStyles, horizontalScale, verticalScale, moderateScale } from '@/src/theme';
import { useRouter } from "expo-router";
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';

const ActivityItem = ({ icon, text }: { icon: any; text: string }) => {
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  
  return (
    <View style={styles.activityItem}>
      <Feather name={icon} size={20} color={themeStyles.colors.greenThemeColor} />
      <Text style={[styles.activityText, { color: themeStyles.colors.text.secondary }]}>{text}</Text>
    </View>
  );
};

const QuickAccessButton = ({ 
  icon, 
  title, 
  onPress 
}: { 
  icon: any; 
  title: string; 
  onPress: () => void;
}) => {
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  
  return (
    <TouchableOpacity 
      style={[
        styles.quickButton, 
        { backgroundColor: themeStyles.colors.darkGrey }
      ]} 
      onPress={onPress}
    >
      <Feather name={icon} size={30} color={themeStyles.colors.greenThemeColor} />
      <Text style={[styles.quickButtonText, { color: themeStyles.colors.text.primary }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const StatItem = ({ 
  icon, 
  value, 
  label 
}: { 
  icon: any; 
  value: string; 
  label: string;
}) => {
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  
  return (
    <View style={styles.statItem}>
      <Feather name={icon} size={24} color={themeStyles.colors.greenThemeColor} />
      <Text style={[styles.statValue, { color: themeStyles.colors.text.primary }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: themeStyles.colors.text.secondary }]}>{label}</Text>
    </View>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.colors.black_grey }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={[styles.welcomeText, { color: themeStyles.colors.text.primary }]}>{t('welcomeTitle')}</Text>
          <Text style={[styles.subText, { color: themeStyles.colors.text.secondary }]}>{t('welcomeSubtitle')}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: themeStyles.colors.darkGrey }]}>
          <View style={styles.cardHeader}>
            <Feather name="activity" size={24} color={themeStyles.colors.greenThemeColor} />
            <Text style={[styles.cardTitle, { color: themeStyles.colors.text.primary }]}>{t('recentActivity')}</Text>
          </View>
          <View style={styles.cardContent}>
            <ActivityItem icon="bookmark" text={t('lastReceipt')} />
            <ActivityItem icon="tool" text={t('maintenanceCheck')} />
            <ActivityItem icon="droplet" text={t('oilChange')} />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: themeStyles.colors.darkGrey }]}>
          <View style={styles.cardHeader}>
            <Feather name="star" size={24} color={themeStyles.colors.greenThemeColor} />
            <Text style={[styles.cardTitle, { color: themeStyles.colors.text.primary }]}>{t('quickAccess')}</Text>
          </View>
          <View style={styles.buttonGrid}>
            <QuickAccessButton
              icon="file-text"
              title={t('viewReceipts')}
              onPress={() => router.push("/reports")}
            />
            <QuickAccessButton 
              icon="truck"
              title={t('manageFleet')}
              onPress={() => router.push("/stats")}
            />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: themeStyles.colors.darkGrey }]}>
          <View style={styles.cardHeader}>
            <Feather name="bar-chart-2" size={24} color={themeStyles.colors.greenThemeColor} />
            <Text style={[styles.cardTitle, { color: themeStyles.colors.text.primary }]}>{t('statistics')}</Text>
          </View>
          <View style={styles.statsGrid}>
            <StatItem icon="truck" value="15" label={t('activeTrucks')} />
            <StatItem icon="dollar-sign" value="$50,000" label={t('income')} />
            <StatItem icon="clock" value="4.5h" label={t('avgDelivery')} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles remain the same
  container: {
    flex: 1,
    paddingTop: verticalScale(14),
  },
  scrollContainer: {
    padding: horizontalScale(16),
  },
  header: {
    marginVertical: verticalScale(38),
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
  },
  subText: {
    fontSize: moderateScale(16),
  },
  card: {
    marginBottom: verticalScale(16),
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  cardTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginLeft: horizontalScale(8),
  },
  cardContent: {
    gap: verticalScale(12),
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(8),
  },
  activityText: {
    fontSize: moderateScale(14),
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: horizontalScale(12),
  },
  quickButton: {
    flex: 1,
    alignItems: 'center',
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
  },
  quickButtonText: {
    marginTop: verticalScale(8),
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginTop: verticalScale(8),
  },
  statLabel: {
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
  },
});