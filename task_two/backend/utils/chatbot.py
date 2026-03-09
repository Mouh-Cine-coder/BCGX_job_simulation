import pandas as pd


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
        df = pd.read_csv(file_name)
        
        return df[df["Company Name"].str.lower() == self.company.lower()]
    
    def debugg(self):
        df = self.get_dataframe("10k_analysis.csv")
        
        print(df)
    
    def simple_chatbot(self, question: str):
        return "Answer"