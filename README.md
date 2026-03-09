"# Lab4" 
Index.jsx acting as home screen
State controls what pokemon is displayed currently and it's name

The Fetch will fail when receiving a non-200 response
Assuming fields are in a JSON could lead to trying to parse information that isn't even there

No idea what "app truth" is
if loading is not set to false then then infinte loading can occur

Rendering a raw JSON will result in all the raw data that was requested being printed. Rendering a shaped object is a refined version of the data that is more readable to a person

The UI responsibility is mainly at the bottom of the file where all the containers are defined for later use. The logic responsibility is in the main part of the file which handles how the data being received gets handled and refined

index.jsx Handles logic, UI, and imports currently

I would have to define the code used for fetching and parsing the data into it's own function then import that function to another file for a different screen

To test the API parsing I would have to search something using the app and comparing the data it outputs to the data its requesting from



