from PyPDF2 import PdfReader

# Create a PDF reader object
reader = PdfReader('file1.pdf')

# Get the total number of pages in the PDF
num_pages = len(reader.pages)

# Initialize an empty string to store the text from all pages
all_text = ''

# Loop through each page and extract text
for page_num in range(num_pages):
    page = reader.pages[page_num]
    text = page.extract_text()
    all_text += text

# Save the extracted text to a text file
with open('output.txt', 'w', encoding='utf-8') as text_file:
    text_file.write(all_text)
