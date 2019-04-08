# Spencer Pease
# INFO 474, Sp 19
# Assignment 1

# Setup -------------------------------------------------------------------

library(readr)
library(tidyr)
library(dplyr)
library(ggplot2)


# Load data ---------------------------------------------------------------

data_path <- file.path("..", "..", "data", "antibiotics_data.csv")
raw_data <- read_csv(data_path)


# Clean data --------------------------------------------------------------

mic_data <- raw_data %>%
  gather("Antibiotic", "Concentration", -Bacteria, -`Gram Staining`) %>%
  mutate(ordering = if_else(`Gram Staining` == "positive", 1, 0))


# Visualization -----------------------------------------------------------

gs_label <- function(string) {
  paste("Gram Staining:", string)
}


plot <-
  ggplot(
    data = mic_data,
    aes(
      x = Antibiotic,
      y = reorder(Bacteria, desc(Bacteria)),
      fill = Concentration
    )
  ) +
  geom_tile(color = "white", size = .1) +
  facet_wrap(
    vars(`Gram Staining`),
    ncol = 1,
    scales = "free_y",
    labeller = labeller(`Gram Staining` = gs_label)) +
  scale_fill_viridis_c(
    name = "Concentration",
    trans = "log10",
    breaks = 10^(-3:3),
    limits = c(1e-3, 1e3)
  ) +
  guides(fill = guide_colourbar(barwidth = 1.5, barheight = 10)) +
  theme_minimal() +
  theme(
    axis.text.x = element_text(angle = 35, hjust = 1),
    panel.grid = element_blank(),
    aspect.ratio = 1.5
  ) +
  labs(
    title = "Antibiotic Effectiveness",
    subtitle = "Measuring Minimum Inhibitory Concentration (MIC)",
    y = "Bacteria"
  )
