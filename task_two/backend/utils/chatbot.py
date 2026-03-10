import pandas as pd
import os


class ChatBot:

    """
        Question that i should answer for each company:

        "What is the total revenue and how has it grown",
        "How profitable it is",
        "How has net income changed over the last year",
        "Is it financially stable",
        "How much cash it's generating",
    """

    def __init__(self, company: str):
        self.company = company

    def get_dataframe(self, file_name: str) -> pd.DataFrame:
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        CSV_PATH = os.path.join(BASE_DIR, file_name)

        try:
            df = pd.read_csv(CSV_PATH)
        except FileNotFoundError as e:
            print("Error ", e)
            return

        return df[df["Company name"].str.lower() == self.company.lower()]

    def q_revenue(self) -> str:
        rows = self.get_dataframe("10k_analysis.csv")
        lines = []

        for _, row in rows.iterrows():
            yoy = f"({row['Revenue Growth (%)']:+.2f}%)" if pd.notna(
                row['Revenue Growth (%)']) else "(base year)"
            lines.append(
                f" {int(row['10-k Year'])}: ${row['Total Revenue']:+.0f}M {yoy}")
        trend = "growing" if rows["Revenue Growth (%)"].dropna(
        ).iloc[-1] > 0 else "declining"
        return f"{self.company}'s total revenue:\n" + "\n".join(lines) + f"\n->Revenue is {trend}"

    def q_profitability(self) -> str:
        rows = self.get_dataframe("10k_analysis.csv")
        lines = []

        for _, row in rows.iterrows():
            yoy = f"({row['Net Income Growth (%)']:+.2f}%)" if pd.notna(
                row['Net Income Growth (%)']) else "(base year)"
            lines.append(
                f" {int(row['10-k Year'])}: ${row['Net Income']:,.0f}M {yoy} - margin {row['Net Margin (%)']:.2f}%")
        return f"{self.company}'s profitability\n" + '\n'.join(lines)

    def q_net_income_change(self) -> str:
        rows = self.get_dataframe("10k_analysis.csv")
        # represents only the change of the last two years (in this case 2024 and 2025)
        latest = rows.iloc[-1]
        prev = rows.iloc[-2]
        change = latest['Net Income Growth (%)']
        direction = 'grew' if change > 0 else 'fell'
        return (
            f"{self.company}'s net income {direction} from "
            f"{prev['Net Income']:,.0f}M in {int(prev['10-k Year'])} to "
            f"{latest['Net Income']:,.0f}M in {int(latest['10-k Year'])} "
            f"- a change of {change:+.2f}%."
        )

    def q_stability(self) -> str:
        # here we are going to talk about Most of the indicators (Total Assets, Total Liabilities, Dep-to-Assets) over the last Three year
        rows = self.get_dataframe("10k_analysis.csv")
        latest = rows.iloc[-1]
        oldest = rows.iloc[0]

        direction = "improving" if latest["Debt-to-Assets (%)"] < oldest["Debt-to-Assets (%)"] else "increasing"
        return (
            f"{self.company}'s balance sheet ({int(latest["10-k Year"])}):\n"
            f"\t-Total Assets:      ${latest['Total Assets']:,.0f}M\n"
            f"\t-Total Liabilities: ${latest['Total Liabilities']:,.0f}M\n"
            f"\t-Debt-to-Assets:    {latest['Debt-to-Assets (%)']:.2f}%\n"
            f"-> Leverage is {direction} compared to {int(oldest['10-k Year'])} with ({oldest['Debt-to-Assets (%)']:.2f}%)."

        )

    def q_cash(self) -> str:
        rows = self.get_dataframe("10k_analysis.csv")
        lines = [
            f" {int(row['10-k Year'])}: ${row['Cash Flow from Operating Activities']:,.0f}M" for _, row in rows.iterrows()]
        latest = rows.iloc[-1]["Cash Flow from Operating Activities"]
        oldest = rows.iloc[0]["Cash Flow from Operating Activities"]
        trend = "growing" if latest > oldest else "declining"

        return f"{self.company}'s operating cash flow:\n" + "\n".join(lines) + f"\n→ Cash generation is {trend}."

    def question(self, question: str):

        if question == "What is the total revenue and how has it grown":
            return self.q_revenue()
        elif question == "How profitable it is":
            return self.q_profitability()
        elif question == "How has net income changed over the last year":
            return self.q_net_income_change()
        elif question == "Is it financially stable":
            return self.q_stability()
        elif question == "How much cash it's generating":
            return self.q_cash()

        return "Not a valid Question"
