import Joi from "joi";

import { Dataset } from "./core";
import CardDefinition, { Card } from "./widgets/Card";
import ContainerDefinition, { Container } from "./widgets/Container";
import TitleDefinition, { Title } from "./widgets/Title";
import LineChartDefinition, { LineChart } from "./widgets/LineChart";
import BarChartDefinition, { BarChart } from "./widgets/BarChart";
import TableDefinition, { Table } from "./widgets/Table";
import RichTextDefinition, { RichText } from "./widgets/RichText";
import BadgeDefinition, { Badge } from "./widgets/Badge";

const DEFINITIONS = [
  ContainerDefinition,
  TitleDefinition,
  LineChartDefinition,
  BarChartDefinition,
  TableDefinition,
  CardDefinition,
  RichTextDefinition,
  BadgeDefinition,
];

export enum WidgetType {
  Card = "card",
  Container = "container",
  Title = "title",
  Image = "image",
  BarChart = "barchart",
  LineChart = "linechart",
  RichText = "richtext",
  Table = "table",
  Badge = "badge",
}

export type AnyWidget =
  | LineChart
  | Container
  | Card
  | BarChart
  | Title
  | Table
  | RichText
  | Badge;

export function renderWidget(
  widget: AnyWidget,
  data: { [key: string]: Dataset | string | number }
): JSX.Element | null {
  const widgetType = widget.type;

  if (widgetType == WidgetType.Container) {
    const container = widget as Container;
    return (
      <ContainerDefinition.widget
        key={container.name}
        {...container}
        data={data}
      >
        {(widget as Container).widgets.map((child: AnyWidget) =>
          renderWidget(child, data)
        )}
      </ContainerDefinition.widget>
    );
  } else if (widgetType == WidgetType.Title) {
    const title = widget as Title;
    return <TitleDefinition.widget key={title.name} {...title} data={data} />;
  } else if (widgetType == WidgetType.BarChart) {
    const barChart = widget as BarChart;
    return (
      <BarChartDefinition.widget
        key={barChart.name}
        {...barChart}
        data={data}
      />
    );
  } else if (widgetType == WidgetType.Card) {
    const card = widget as Card;
    return <CardDefinition.widget key={card.name} {...card} data={data} />;
  } else if (widgetType == WidgetType.LineChart) {
    const lineChart = widget as LineChart;
    return (
      <LineChartDefinition.widget
        key={lineChart.name}
        {...lineChart}
        data={data}
      />
    );
  } else if (widgetType == WidgetType.Table) {
    const table = widget as Table;
    return <TableDefinition.widget key={table.name} {...table} data={data} />;
  } else if (widgetType == WidgetType.RichText) {
    const richText = widget as RichText;
    return (
      <RichTextDefinition.widget
        key={richText.name}
        {...richText}
        data={data}
      />
    );
  } else if (widgetType == WidgetType.Badge) {
    const badge = widget as Badge;
    return <BadgeDefinition.widget key={badge.name} {...badge} data={data} />;
  } else {
    return null;
  }
}

export const widgetValidation = Joi.alternatives()
  .try(
    ContainerDefinition.validator,
    ContainerDefinition.validator,
    TitleDefinition.validator,
    LineChartDefinition.validator,
    BarChartDefinition.validator,
    TableDefinition.validator,
    CardDefinition.validator,
    RichTextDefinition.validator,
    BadgeDefinition.validator
  )
  .id("widget");

export const boardValidator = Joi.array().items(widgetValidation).id("board");

export const WIDGET_INFO = DEFINITIONS.map((definition) => ({
  id: definition.id,
  name: definition.name,
  icon: definition.icon,
  propsEditor: definition.propsEditor,
}));

export const WIDGET_INFO_BY_ID = DEFINITIONS.reduce(
  (acc, definition) => ({ ...acc, [definition.id]: definition }),
  {}
);
