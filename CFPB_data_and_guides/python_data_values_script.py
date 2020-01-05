import pandas as pd

#Adjust the path to where you have saved the csv
df = pd.read_csv("data_narrowed.csv")

#Map values
df = df.replace({"sample":{
  1: "General population",
  2: "Age 62+ oversample",
  3: "Race/ethnicity and poverty oversample"
},
"fpl":{
  1: "<100% FPL",
  2: "100%-199% FPL",
  3: "200%+ FPL"
},
"FWBscore":{
  -4: "Response not written to database",
  -1: "Refused"
},
"FWB1_1":{
  -4: "Response not written to database",
  -1: "Refused",
  1: "Not at all",
  2: "Very little",
  3: "Somewhat",
  4: "Very well",
  5: "Completely"
},
"FWB1_2":{
  -4: "Response not written to database",
  -1: "Refused",
  1: "Not at all",
  2: "Very little",
  3: "Somewhat",
  4: "Very well",
  5: "Completely"
},
"FWB1_3":{
  -4: "Response not written to database",
  -1: "Refused",
  1: "Not at all",
  2: "Very little",
  3: "Somewhat",
  4: "Very well",
  5: "Completely"
},
"FWB1_4":{
  -4: "Response not written to database",
  -1: "Refused",
  1: "Not at all",
  2: "Very little",
  3: "Somewhat",
  4: "Very well",
  5: "Completely"
},
"FWB1_5":{
  -4: "Response not written to database",
  -1: "Refused",
  1: "Not at all",
  2: "Very little",
  3: "Somewhat",
  4: "Very well",
  5: "Completely"
},
"FWB1_6":{
  -4: "Response not written to database",
  -1: "Refused",
  1: "Not at all",
  2: "Very little",
  3: "Somewhat",
  4: "Very well",
  5: "Completely"
},
"FWB2_1":{
  -4: "Response not written to database",
  -1: "Refused",
  1: "Never",
  2: "Rarely",
  3: "Sometimes",
  4: "Often",
  5: "Always"
},
"FWB2_2":{
  -4: "Response not written to database",
  -1: "Refused",
  1: "Never",
  2: "Rarely",
  3: "Sometimes",
  4: "Often",
  5: "Always"
},
"FWB2_3":{
  -4: "Response not written to database",
  -1: "Refused",
  1: "Never",
  2: "Rarely",
  3: "Sometimes",
  4: "Often",
  5: "Always"
},
"FWB2_4":{
  -4: "Response not written to database",
  -1: "Refused",
  1: "Never",
  2: "Rarely",
  3: "Sometimes",
  4: "Often",
  5: "Always"
},
"FSscore":{
  -1: "Refused"
},
"HOUSING":{
  -1: "Refused",
  1: "I own my home",
  2: "I rent",
  3: "I do not currently own or rent"
},
"HOUSERANGES":{
  -1: "Refused",
  1: "Less than $300",
  2: "$300-499",
  3: "$500-749",
  4: "$750-999",
  5: "$1,000-1,499",
  6: "$1,500-1,999",
  7: "$2,000 or more",
  98: "I dont know",
  99: "Prefer not to say"
},
"SAVINGSRANGES":{
  -1: "Refused",
  1: "0",
  2: "$1-99",
  3: "$100-999",
  4: "$1,000-4,999",
  5: "$5,000-19,999",
  6: "$20,000-74,999",
  7: "$75,000 or more",
  98: "I dont know",
  99: "Prefer not to say"
},
"PRODHAVE_1":{
  0: "No",
  1: "Yes"
},
"PRODHAVE_3":{
  0: "No",
  1: "Yes"
},
"PRODHAVE_4":{
  0: "No",
  1: "Yes"
},
"PRODHAVE_5":{
  0: "No",
  1: "Yes"
},
"PRODUSE_1":{
  0: "No",
  1: "Yes"
},
"PRODUSE_2":{
  0: "No",
  1: "Yes"
},
"PRODUSE_5":{
  0: "No",
  1: "Yes"
},
"CONSPROTECT1":{
  -1: "Refused",
  1: "Never",
  2: "Rarely",
  3: "Sometimes",
  4: "Often"
},
"MATHARDSHIP_1":{
  -1: "Refused",
  1: "Never",
  2: "Sometimes",
  3: "Often"
},
"MATHARDSHIP_2":{
  -1: "Refused",
  1: "Never",
  2: "Sometimes",
  3: "Often"
},
"MATHARDSHIP_3":{
  -1: "Refused",
  1: "Never",
  2: "Sometimes",
  3: "Often"
},
"MATHARDSHIP_4":{
  -1: "Refused",
  1: "Never",
  2: "Sometimes",
  3: "Often"
},
"MATHARDSHIP_5":{
  -1: "Refused",
  1: "Never",
  2: "Sometimes",
  3: "Often"
},
"MATHARDSHIP_6":{
  -1: "Refused",
  1: "Never",
  2: "Sometimes",
  3: "Often"
},
"REJECTED_1":{
  -1: "Refused",
  0: "No",
  1: "Yes"
},
"ABSORBSHOCK":{
  -1: "Refused",
  1: "I am certain I could not come up with $2,000",
  2: "I could probably not come up with $2,000",
  3: "I could probably come up with $2,000",
  4: "I am certain I could come up with the full $2,000",
  8: "I dont know"
},
"SHOCKS_1":{
  0: "No",
  1: "Yes"
},
"SHOCKS_3":{
  0: "No",
  1: "Yes"
},
"HEALTH":{
  -1: "Refused",
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very good",
  5: "Excellent"
},
"agecat":{
  1: "18-24",
  2: "25-34",
  3: "35-44",
  4: "45-54",
  5: "55-61",
  6: "62-69",
  7: "70-74",
  8: "75+"
},
"generation":{
  1: "Pre-Boomer",
  2: "Boomer",
  3: "Gen X",
  4: "Millennial"
},
"PPEDUC":{
  1: "Less than high school",
  2: "High school degree/GED",
  3: "Some college/Associate",
  4: "Bachelors degree",
  5: "Graduate/professional degree"
},
"PPETHM":{
  1: "White, Non-Hispanic",
  2: "Black, Non-Hispanic",
  3: "Other, Non-Hispanic",
  4: "Hispanic"
},
"PPGENDER":{
  1: "Male",
  2: "Female"
},
"PPHHSIZE":{
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5+"
},
"PPINCIMP":{
  1: "Less than $20,000",
  2: "$20,000 to $29,999",
  3: "$30,000 to $39,999",
  4: "$40,000 to $49,999",
  5: "$50,000 to $59,999",
  6: "$60,000 to $74,999",
  7: "$75,000 to $99,999",
  8: "$100,000 to $149,999",
  9: "$150,000 or more"
},
"PPMARIT":{
  1: "Married",
  2: "Widowed",
  3: "Divorced/Separated",
  4: "Never married",
  5: "Living with partner"
},
"PPMSACAT":{
  0: "Non-Metro",
  1: "Metro"
}})
