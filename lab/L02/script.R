
# Setup -------------------------------------------------------------------

library(readr)
library(dplyr)
library(ggplot2)


# Load data ---------------------------------------------------------------

data <- read_csv("../../data/tips.csv")


# EDA ---------------------------------------------------------------------

p1 <-
  ggplot(
    data = data,
    aes(x = total_bill, y = tip, size = size, color = sex)
  ) +
  geom_point(alpha = .7) +
  facet_grid(time ~ day) +
  geom_smooth(
    se = FALSE,
    method = lm,
    inherit.aes = FALSE,
    aes(x = total_bill, y = tip)
  ) +
  labs(
    title = "Tip versus Total bill",
    subtitle = "Grouped by Sex and Party size across days",
    x = "Total Bill ($)",
    y = "Tip ($)"
  )


p2 <-
  ggplot(
    data = data,
    aes(x = tip, fill = sex)
  ) +
  geom_density(alpha = .5) +
  facet_wrap(vars(day))


# Save plots --------------------------------------------------------------

ggsave(p1, "plot.png", dpi = 300, width = 8, height = 7)
