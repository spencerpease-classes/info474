
# Load libraries ----------------------------------------------------------

library(PWFSLSmoke)
library(AirMonitorPlots)


# Get data ----------------------------------------------------------------

raw_data <- monitor_load(
  startdate = 20180810, enddate = 20180901,
  monitorIDs = "530330030_01"
)


# Subset data -------------------------------------------------------------

data <- raw_data

# data <- raw_data %>%
#   monitor_subset(
#     stateCodes = "WA",
#     tlim = c(20180810, 20180831)
#   ) %>%
#   monitor_subsetByDistance(
#     longitude = -122.3197, latitude = 47.59722,
#     radius = 20
#   )

# monitor_leaflet(data)
# monitor_ggTimeseries(data)


# Format data -------------------------------------------------------------

tidy_data <- data %>%
  monitor_nowcast(includeShortTerm = TRUE) %>%
  monitor_toTidy() %>%
  mutate(
    datetime = lubridate::with_tz(.data$datetime, "America/Los_Angeles"),
    date = strftime(.data$datetime, format = "%Y-%m-%d"),
    hour = strftime(.data$datetime, format = "%H"),
    day = strftime(.data$datetime, format = "%d")
  ) %>%
  filter(
    .data$datetime >= "2018-08-10",
    .data$datetime < "2018-08-31"
  ) %>%
  select(.data$date, .data$hour, .data$day, .data$pm25)


# Export data -------------------------------------------------------------

readr::write_csv(tidy_data, "pm25_data.csv")
