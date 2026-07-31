import React, { useState } from 'react';

function BookPromotion() {
    const [currentBookIndex, setCurrentBookIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const books = [
        {
            title: 'The Hunter: A Novel',
            author: 'Tana French',
            imageUrl: 'https://cdn2.penguin.com.au/covers/original/9780241684306.jpg',
            date: 'March 5, 2024',
            desc: 'Embark on a journey through rural Ireland, where secrets and redemption intertwine in a spellbinding narrative',
            stars: 4, // Number of stars for this book
            percentage: "10% OFF",
            url:"https://www.amazon.com/Hunter-Novel-Tana-French/dp/0593493435?crid=2KNXMW8USLVYU&keywords=The+Hunter,+Tana+French&qid=1702057442&sprefix=the+hunter,+tana+french,aps,79&sr=8-1&linkCode=sl1&tag=time-books-22-20&linkId=0be9980010924e5555294c022d7b3e6e&language=en_US&ref_=as_li_ss_tl",
        },
        {
            title: 'Just For The Summer',
            author: 'Abby Jimenez',
            imageUrl: 'https://m.media-amazon.com/images/I/71oreg0npVL._SL1500_.jpg',
            date: 'March 2, 2024',
            desc: "Experience the irresistible charm of Abby Jimenez's storytelling as she weaves tales of love, laughter, and the unexpected.",
            stars: 5, // Number of stars for this book
            percentage: "20% OFF",
            url: "https://www.amazon.in/Just-Summer-Abby-Jimenez-ebook/dp/B0CF8TB2GK"
        },
        {
            title: 'Lies and Weddings',
            author: 'Kevin Kwan',
            imageUrl: 'https://images1.penguinrandomhouse.com/cover/9780385546294',
            date: 'March 20, 2024',
            desc: "Discover a world where love, ambition, and scandal collide, as Rufus Leung Gresham faces the ultimate choice: duty or desire, tradition or true love.",
            stars: 3, // Number of stars for this book
            percentage: "15% OFF",
            url: "https://www.amazon.com/Lies-Weddings-Novel-Kevin-Kwan/dp/0385546297"
        },
        {
            title: 'Just For The Summer',
            author: 'Abby Jimenez',
            imageUrl: 'https://m.media-amazon.com/images/I/71oreg0npVL._SL1500_.jpg',
            date: 'March 2, 2024',
            desc: "Experience the irresistible charm of Abby Jimenez's storytelling as she weaves tales of love, laughter, and the unexpected.",
            stars: 4, // Number of stars for this book
            percentage: "20% OFF",
            url: "https://www.amazon.in/Just-Summer-Abby-Jimenez-ebook/dp/B0CF8TB2GK"
        },
        // Add data for other books
    ];

    const discountStyle = {
        backgroundColor: '#baa330',
        color: '#ffffff',
        padding: '0.25rem 1.5rem',
        borderRadius: '9999px',
        position: 'absolute',
        top: '0.5rem',
        right: '1rem',
        transform: `rotate(30deg) ${isHovered ? 'scale(1.1)' : 'scale(1)'}`,
        transition: 'transform 0.3s ease',
        zIndex: '1',
        animation: isHovered ? 'shake 0.5s' : 'none',
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handlePrevBook = () => {
        setCurrentBookIndex(prevIndex => (prevIndex === 0 ? books.length - 1 : prevIndex - 1));
    };

    const handleNextBook = () => {
        setCurrentBookIndex(prevIndex => (prevIndex === books.length - 1 ? 0 : prevIndex + 1));
    };

    const book = books[currentBookIndex];

    return (
        <div className="right-bar-container bg-brown">
            <div>
                <h2 className="text-xl text-white text-center font-semibold mt-9">New Arrivals</h2>

                <div className="relative mt-[5rem]">

                    <div style={discountStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        {book.percentage}
                    </div>
                    <div className="relative mt-[-2rem] flex items-center">
                        <button onClick={handlePrevBook} className="ml-2 mr-5 text-white">
                            &#10094; {/* Left arrow */}
                        </button>

                        <div
                            className="items-center rounded-lg overflow-hidden border-8 border-white w-56 h-82"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleNextBook}
                        >
                            <img src={book.imageUrl} alt="Book Cover" className="w-full h-full object-cover" />
                        </div>

                        <button onClick={handleNextBook} className="ml-5 text-white">
                            &#10095; {/* Right arrow */}
                        </button>
                    </div>
                </div>
              
                <div className="p-5 ml-4">
                    <h3 className="text-lg font-semibold text-white">{book.title}</h3>
                    <p className="text-white text-sm mb-1">by {book.author}</p>
                    <p className="text-white text-xs mb-3">{book.date}</p>
                    <p className="text-white text-sm mb-3">{book.desc}</p>
                    <div className="flex text-white text-2xl">
                        {Array.from({ length: book.stars }, (_, index) => (
                            <span key={index} className="mr-1">
                                &#9733;
                            </span>
                        ))}
                    </div>
                    <a href={book.url} className="bg-right-orange text-white py-1 px-4 rounded mt-2 inline-block"
                    >
                        Buy Now
                    </a>
                </div>

            </div>
          

            <style>
                {`
                    @keyframes shake {
                        0% { transform: rotate(30deg) scale(1.1); }
                        25% { transform: rotate(30deg) scale(1.05); }
                        50% { transform: rotate(30deg) scale(1.1); }
                        75% { transform: rotate(30deg) scale(1.05); }
                        100% { transform: rotate(30deg) scale(1.1); }
                    }
                `}
            </style>
        </div>
    );
}

export default BookPromotion;
