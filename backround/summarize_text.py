from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

# Input text to be summarized
input_text = """
Technology has become an essential part of everyday life, shaping how people learn, communicate, and solve problems. From smartphones to cloud computing, digital tools allow individuals to access information instantly and collaborate across the world. This constant connectivity has transformed education, making learning more flexible and personalized through online courses, interactive platforms, and open resources.

However, technology is not only about convenience. It also encourages new ways of thinking. Programming, data analysis, and automation help people break complex problems into smaller, logical steps. These skills are increasingly valuable, not just for engineers, but for anyone working in science, business, or creative fields. At the same time, technology raises important questions about privacy, ethics, and responsible use. Understanding how systems work makes users more aware and better equipped to make informed decisions.

As tools continue to evolve, the most important skill is adaptability. Learning how to learn—experimenting, failing, and improving—is more valuable than memorizing facts. When used thoughtfully, technology can amplify human creativity and curiosity rather than replace them. The challenge is to balance efficiency with reflection, speed with accuracy, and innovation with responsibility, ensuring that progress benefits both individuals and society as a whole.
"""

def summarize_text(input_text):
    # Parse the input text
    parser = PlaintextParser.from_string(input_text, Tokenizer("english"))

    # Create an LSA summarizer
    summarizer = LsaSummarizer()

    # Generate the summary
    summary = summarizer(parser.document, sentences_count=3)  

    # Convert to readable text
    summary_text = " ".join([str(sentence) for sentence in summary])
    
    return summary_text

