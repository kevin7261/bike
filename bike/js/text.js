
function getText_Title(version, language) {

	text = ""

	if (dataset_text != null) {

	    switch (version) {

	        case VERSION.YOUBIKE: 
	        {
				switch (language) {
					case LANGUAGE.EN: text = dataset_text.title.youbike.en; break;
					case LANGUAGE.ZH: text = dataset_text.title.youbike.zh; break;
					case LANGUAGE.DE: text = dataset_text.title.youbike.de; break;
				}

				break
	        }
	        case VERSION.COMPARE:
			{
				switch (language) {
					case LANGUAGE.EN: text = dataset_text.title.berlin.en; break;
					case LANGUAGE.ZH: text = dataset_text.title.berlin.zh; break;
					case LANGUAGE.DE: text = dataset_text.title.berlin.de; break;
				}

				break
			}
	    }
	}

	return text
}

function getText_Taipei(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.taipei.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.taipei.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.taipei.de; break;
		}
	}

	return text
}

function getText_Taipei_City(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.taipei_city.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.taipei_city.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.taipei_city.de; break;
		}
	}

	return text
}

function getText_Taipei_Metro_Area(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.taipei_metro_area.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.taipei_metro_area.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.taipei_metro_area.de; break;
		}
	}

	return text
}

function getText_Berlin(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.berlin.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.berlin.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.berlin.de; break;
		}
	}

	return text
}

function getText_Berlin_Inner_City(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.berlin_inner_city.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.berlin_inner_city.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.berlin_inner_city.de; break;
		}
	}

	return text
}

function getText_Population(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.population.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.population.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.population.de; break;
		}
	}

	return text
}

function getText_Bikes(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.bikes.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.bikes.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.bikes.de; break;
		}
	}

	return text
}

function getText_Trips(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.trips.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.trips.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.trips.de; break;
		}
	}

	return text
}


function getText_RentalStations(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.rental_stations.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.rental_stations.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.rental_stations.de; break;
		}
	}

	return text
}

function getText_Weekday(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.weekday.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.weekday.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.weekday.de; break;
		}
	}

	return text
}

function getText_Weekend(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.weekend.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.weekend.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.weekend.de; break;
		}
	}

	return text
}

function getText_Precipitation(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.precipitation.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.precipitation.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.precipitation.de; break;
		}
	}

	return text
}

function getText_PrecipitationHours(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.precipitation_hour.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.precipitation_hour.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.precipitation_hour.de; break;
		}
	}

	return text
}

function getText_DataLoss(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.data_loss.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.data_loss.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.data_loss.de; break;
		}
	}

	return text
}

function getText_Median(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.median.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.median.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.median.de; break;
		}
	}

	return text
}

function getText_ScaleName(index, language) {

	text = ""

	if (dataset_text != null) {

		switch (index) {
			case 0: text = getText_Relative(language); break;
			case 1: text = getText_Absolute(language); break;
		}
	}

	return text
}

function getText_Relative(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.relative.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.relative.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.relative.de; break;
		}
	}

	return text
}

function getText_Absolute(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.absolute.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.absolute.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.absolute.de; break;
		}
	}

	return text
}

function getText_Scale(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.scale.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.scale.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.scale.de; break;
		}
	}

	return text
}

function getText_TypeName(index, language) {

	text = ""

	if (dataset_text != null) {

		switch (index) {
			case 0: text = getText_All(language); break;
			case 1: text = getText_ReturnToDiffSta(language); break;
			case 2: text = getText_ReturnToSameSta(language); break;
		}
	}

	return text
}

function getText_All(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.all.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.all.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.all.de; break;
		}
	}

	return text
}

function getText_ReturnToDiffSta(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.return_to_diff_sta.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.return_to_diff_sta.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.return_to_diff_sta.de; break;
		}
	}

	return text
}

function getText_ReturnToSameSta(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.return_to_same_sta.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.return_to_same_sta.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.return_to_same_sta.de; break;
		}
	}

	return text
}

function getText_Type(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.type.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.type.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.type.de; break;
		}
	}

	return text
}

function getText_Company(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.company.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.company.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.company.de; break;
		}
	}

	return text
}

function getText_KM(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.km.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.km.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.km.de; break;
		}
	}

	return text
}

function getText_Min(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.min.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.min.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.min.de; break;
		}
	}

	return text
}

function getText_Week(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.week.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.week.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.week.de; break;
		}
	}

	return text
}

function getText_WeekName(w, language) {

	text = ""

	if (dataset_text != null) {

		let index = w

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.week_name[index].en; break;
			case LANGUAGE.ZH: text = dataset_text.text.week_name[index].zh; break;
			case LANGUAGE.DE: text = dataset_text.text.week_name[index].de; break;
		}
	}

	return text
}

function getText_Month(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.month.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.month.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.month.de; break;
		}
	}

	return text
}

function getText_MonthName(m, language) {

	text = ""

	if (dataset_text != null) {

		let index = m - 1

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.month_name[index].en; break;
			case LANGUAGE.ZH: text = dataset_text.text.month_name[index].zh; break;
			case LANGUAGE.DE: text = dataset_text.text.month_name[index].de; break;
		}
	}

	return text
}

function getText_Date(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.date.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.date.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.date.de; break;
		}
	}

	return text
}

function getText_NumberOfTrips(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.number_of_trips.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.number_of_trips.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.number_of_trips.de; break;
		}
	}

	return text
}

function getText_Hours(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.hours.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.hours.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.hours.de; break;
		}
	}

	return text
}

function getText_Mountain(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.mountain.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.mountain.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.mountain.de; break;
		}
	}

	return text
}

function getText_Plain(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.plain.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.plain.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.plain.de; break;
		}
	}

	return text
}

function getText_River(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.river.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.river.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.river.de; break;
		}
	}

	return text
}

function getText_Park(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.park.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.park.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.park.de; break;
		}
	}

	return text
}

function getText_BerlinRingbahn(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.berlin_ringbahn.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.berlin_ringbahn.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.berlin_ringbahn.de; break;
		}
	}

	return text
}

function getText_TripsNumberOfTheSelectedArea(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.trips_number_of_the_selected_area.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.trips_number_of_the_selected_area.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.trips_number_of_the_selected_area.de; break;
		}
	}

	return text
}

function getText_CompareWithAll(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.compare_with_all.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.compare_with_all.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.compare_with_all.de; break;
		}
	}

	return text
}

function getText_CompareWithItself(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.compare_with_itself.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.compare_with_itself.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.compare_with_itself.de; break;
		}
	}

	return text
}

function getText_Landmark(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.landmark.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.landmark.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.landmark.de; break;
		}
	}

	return text
}

function getText_KeelungRiver(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.keelung_river.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.keelung_river.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.keelung_river.de; break;
		}
	}

	return text
}

function getText_TamsuiRiver(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.tamsui_river.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.tamsui_river.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.tamsui_river.de; break;
		}
	}

	return text
}

function getText_TSA(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.tsa.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.tsa.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.tsa.de; break;
		}
	}

	return text
}

function getText_TaipeiMainStation(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.taipei_main_station.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.taipei_main_station.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.taipei_main_station.de; break;
		}
	}

	return text
}

function getText_Taipei101(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.taipei_101.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.taipei_101.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.taipei_101.de; break;
		}
	}

	return text
}

function getText_NTU(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.ntu.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.ntu.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.ntu.de; break;
		}
	}

	return text
}

function getText_BerlinHBF(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.berlin_hbf.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.berlin_hbf.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.berlin_hbf.de; break;
		}
	}

	return text
}

function getText_ZoolGarten(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.zoo_garten.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.zoo_garten.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.zoo_garten.de; break;
		}
	}

	return text
}

function getText_Alexanderplatz(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.alexanderplatz.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.alexanderplatz.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.alexanderplatz.de; break;
		}
	}

	return text
}

function getText_Tiergarten(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.tiergarten.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.tiergarten.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.tiergarten.de; break;
		}
	}

	return text
}

function getText_TempelhoferFeld(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.tempelhofer_feld.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.tempelhofer_feld.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.tempelhofer_feld.de; break;
		}
	}

	return text
}

function getText_Spree(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.spree.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.spree.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.spree.de; break;
		}
	}

	return text
}

function getText_Landwehrkanal(language) {

	text = ""

	if (dataset_text != null) {

		switch (language) {
			case LANGUAGE.EN: text = dataset_text.text.landwehrkanal.en; break;
			case LANGUAGE.ZH: text = dataset_text.text.landwehrkanal.zh; break;
			case LANGUAGE.DE: text = dataset_text.text.landwehrkanal.de; break;
		}
	}

	return text
}

// ----------------------

function getText_Weekly_SubTitle(version, language) {

	text = ""

	if (dataset_text != null) {

	    switch (version) {

	        case VERSION.YOUBIKE: 
	        {
				switch (language) {
					case LANGUAGE.EN: text = dataset_text.weekly.youbike.title_sub.en; break;
					case LANGUAGE.ZH: text = dataset_text.weekly.youbike.title_sub.zh; break;
					case LANGUAGE.DE: text = dataset_text.weekly.youbike.title_sub.de; break;
				}

				break
	        }
	        case VERSION.COMPARE:
			{
				switch (language) {
					case LANGUAGE.EN: text = dataset_text.weekly.berlin.title_sub.en; break;
					case LANGUAGE.ZH: text = dataset_text.weekly.berlin.title_sub.zh; break;
					case LANGUAGE.DE: text = dataset_text.weekly.berlin.title_sub.de; break;
				}

				break
			}
	    }
	}

	return text
}

function getText_Daily_SubTitle(version, language) {

	text = ""

	if (dataset_text != null) {

	    switch (version) {

	        case VERSION.YOUBIKE: 
	        {
				switch (language) {
					case LANGUAGE.EN: text = dataset_text.daily.youbike.title_sub.en; break;
					case LANGUAGE.ZH: text = dataset_text.daily.youbike.title_sub.zh; break;
					case LANGUAGE.DE: text = dataset_text.daily.youbike.title_sub.de; break;
				}

				break
	        }
	        case VERSION.COMPARE:
			{
				switch (language) {
					case LANGUAGE.EN: text = dataset_text.daily.berlin.title_sub.en; break;
					case LANGUAGE.ZH: text = dataset_text.daily.berlin.title_sub.zh; break;
					case LANGUAGE.DE: text = dataset_text.daily.berlin.title_sub.de; break;
				}

				break
			}
	    }
	}

	return text
}

function getText_Hourly_SubTitle(version, language) {

	text = ""

	if (dataset_text != null) {

	    switch (version) {

	        case VERSION.YOUBIKE: 
	        {
				switch (language) {
					case LANGUAGE.EN: text = dataset_text.hourly.youbike.title_sub.en; break;
					case LANGUAGE.ZH: text = dataset_text.hourly.youbike.title_sub.zh; break;
					case LANGUAGE.DE: text = dataset_text.hourly.youbike.title_sub.de; break;
				}

				break
	        }
	        case VERSION.COMPARE:
			{
				switch (language) {
					case LANGUAGE.EN: text = dataset_text.hourly.berlin.title_sub.en; break;
					case LANGUAGE.ZH: text = dataset_text.hourly.berlin.title_sub.zh; break;
					case LANGUAGE.DE: text = dataset_text.hourly.berlin.title_sub.de; break;
				}

				break
			}
	    }
	}

	return text
}

function getText_Duration_SubTitle(version, language) {

	text = ""

	if (dataset_text != null) {

	    switch (version) {

	        case VERSION.YOUBIKE: 
	        {
				switch (language) {
					case LANGUAGE.EN: text = dataset_text.duration_distance.youbike.title_duration.en; break;
					case LANGUAGE.ZH: text = dataset_text.duration_distance.youbike.title_duration.zh; break;
					case LANGUAGE.DE: text = dataset_text.duration_distance.youbike.title_duration.de; break;
				}

				break
	        }
	        case VERSION.COMPARE:
			{
				switch (language) {
					case LANGUAGE.EN: text = dataset_text.duration_distance.berlin.title_duration.en; break;
					case LANGUAGE.ZH: text = dataset_text.duration_distance.berlin.title_duration.zh; break;
					case LANGUAGE.DE: text = dataset_text.duration_distance.berlin.title_duration.de; break;
				}

				break
			}
	    }
	}

	return text
}

function getText_Distance_SubTitle(version, language) {

	text = ""

	if (dataset_text != null) {

	    switch (version) {

	        case VERSION.YOUBIKE: 
	        {
				switch (language) {
					case LANGUAGE.EN: text = dataset_text.duration_distance.youbike.title_distance.en; break;
					case LANGUAGE.ZH: text = dataset_text.duration_distance.youbike.title_distance.zh; break;
					case LANGUAGE.DE: text = dataset_text.duration_distance.youbike.title_distance.de; break;
				}

				break
	        }
	        case VERSION.COMPARE:
			{
				switch (language) {
					case LANGUAGE.EN: text = dataset_text.duration_distance.berlin.title_distance.en; break;
					case LANGUAGE.ZH: text = dataset_text.duration_distance.berlin.title_distance.zh; break;
					case LANGUAGE.DE: text = dataset_text.duration_distance.berlin.title_distance.de; break;
				}

				break
			}
	    }
	}

	return text
}
