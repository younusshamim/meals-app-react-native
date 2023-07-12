import { FlatList, StyleSheet, View } from "react-native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import { useRoute } from "@react-navigation/native";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";

const MealsOverviewScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;

  const displayedMeals = MEALS.filter((meal) => {
    return meal.categoryIds.indexOf(categoryId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id == categoryId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  const renderMealItem = ({ item }) => {
    return <MealItem {...item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
