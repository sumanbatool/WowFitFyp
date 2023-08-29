import React from 'react';
import { View, Text, FlatList, StyleSheet,Image,useWindowDimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';

const Recipe = ({ route }) => {
  const { instructions, ingredients } = route.params;
  const windowDimensions = useWindowDimensions();
  console.log(instructions)
  const renderHTML = (htmlContent) => {
    const containsHTMLTags = /<\/?[a-z][\s\S]*>/i.test(instructions);

    const htmlStyles = {
      ol: { fontSize: 16, color: 'black', lineHeight: 24 },
      p: { fontSize: 16, color: 'black', lineHeight: 24 },
      // Example style for paragraphs
    };
    if (containsHTMLTags) {
      return (
        <HTML
          source={{ html: instructions }}
          contentWidth={windowDimensions.width}
          tagsStyles={htmlStyles} // Apply styles defined in CSS stylesheet
        />
      );
    } else {
      return (
        <Text style={styles.p}>{instructions}</Text>
      );
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flexDirection:"row",borderColor:"black",borderWidth:2,}}>
<Text style={styles.Recipe}>Recipe</Text>
<Image source={{ uri: 'https://th.bing.com/th/id/OIP.RcH_9bQOHgqf4qU_Yep8_AHaGU?w=196&h=180&c=7&r=0&o=5&dpr=1.9&pid=1.7'}}
        style={{ width: 80, height: 80, resizeMode: 'contain',marginTop:10, }}
        />
</View>
      <View style={styles.Ingredientsection}>
        <View style={{flexDirection:'row',}}>
        <Text style={styles.title}>Ingredients:</Text>
       </View>
        <FlatList
          data={ingredients}
          renderItem={({ item }) => (
            <View style={styles.ingredientItem}>
              <Text style={styles.ingredientText}>{`${item.original}`}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          //ItemSeparatorComponent={renderItemSeparator}
        />
      </View>

      <View style={styles.section}>
        <View style={{flexDirection:"row"}}>
        <Text style={styles.titleInstruction}>Instructions:</Text>
       
</View>
        {renderHTML(instructions)}


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  Ingredientsection: {
    marginBottom: 20,
    marginTop: 30,
    //borderBottomWidth:2,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    //marginRight:200,
    //marginTop:22,
    fontFamily:'cursive',
    marginLeft:6,
  },
  Recipe: {
    fontSize: 35,
    fontWeight: 'bold',
    //marginBottom: 5,
    color: 'black',
    marginRight:180,
    marginTop:22,
    fontFamily:'cursive',
    marginLeft:15,
    
  },
  titleInstruction:{
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    marginRight:102,
    marginTop:25,
    marginLeft:16,
    fontFamily:'cursive',

  },
  ingredientItem: {
    marginBottom: 8,
    marginTop:5,
    marginLeft:6,
  },
  ingredientText: {
    fontSize: 16,
    color:"black",

  },
  p: {
    fontSize: 16,
    color:"black",
  },
  separator: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
});


export default Recipe;
