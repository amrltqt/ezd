import Joi from "joi";

import { nanoid } from "nanoid";

import { Dataset } from "./core";
import CardDefinition, { Card } from "./widgets/Card";
import ContainerDefinition, { Container } from "./widgets/Container";
import TitleDefinition, { Title } from "./widgets/Title";
import LineChartDefinition, { LineChart } from "./widgets/LineChart";
import BarChartDefinition, { BarChart } from "./widgets/BarChart";
import TableDefinition, { Table } from "./widgets/Table";
import RichTextDefinition, { RichText } from "./widgets/RichText";
import BadgeDefinition, { Badge } from "./widgets/Badge";

export enum WidgetType {
  Card = "Card",
  Container = "Container",
  Title = "Title",
  Image = "Image",
  BarChart = "BarChart",
  LineChart = "LineChart",
  RichText = "RichText",
  Table = "Table",
  Badge = "Badge",
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
      <ContainerDefinition.widget key={nanoid()} {...container} data={data}>
        {(widget as Container).widgets.map((child: AnyWidget) =>
          renderWidget(child, data)
        )}
      </ContainerDefinition.widget>
    );
  } else if (widgetType == WidgetType.Title) {
    const title = widget as Title;
    return <TitleDefinition.widget key={nanoid()} {...title} data={data} />;
  } else if (widgetType == WidgetType.BarChart) {
    const barChart = widget as BarChart;
    return (
      <BarChartDefinition.widget key={nanoid()} {...barChart} data={data} />
    );
  } else if (widgetType == WidgetType.Card) {
    const card = widget as Card;
    return <CardDefinition.widget key={nanoid()} {...card} data={data} />;
  } else if (widgetType == WidgetType.LineChart) {
    const lineChart = widget as LineChart;
    return (
      <LineChartDefinition.widget key={nanoid()} {...lineChart} data={data} />
    );
  } else if (widgetType == WidgetType.Table) {
    const table = widget as Table;
    return <TableDefinition.widget key={nanoid()} {...table} data={data} />;
  } else if (widgetType == WidgetType.RichText) {
    const richText = widget as RichText;
    return (
      <RichTextDefinition.widget key={nanoid()} {...richText} data={data} />
    );
  } else if (widgetType == WidgetType.Badge) {
    const badge = widget as Badge;
    return <BadgeDefinition.widget key={nanoid()} {...badge} data={data} />;
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
