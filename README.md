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

Less lines of code and faster load times as there isnt a need to import react multiple times

The service function's input is from the User then it requests the data related to that input, parses and refines the data as an output, an error will be put in the output instead if the input is an invalid name

A builder pattern gives a function that can be used anywhere as a format for the data related to a pokemon

The model can be used in multiple files and has less code mixed up in it in case an error occurs and needs bug fixing

The controller manages the states as well as the calling of fetchpokemon

Makes the main page code a lot more consise and easier to understand

the props needed were: loading, error, pokemon, and searchPokemon

There could be state change errors

It allows the functions to be reused for the future if needed and used across muliple files

The state is determined by the code when requested instead of being stored

Allows the data to be reused in other files

A state is defined in the code and changed accordingly, while a persisted state is determined when its called and never existed before being called
