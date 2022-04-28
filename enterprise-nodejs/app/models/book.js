module.exports = mongoose => {
    const Book = mongoose.model(
        "book",
        mongoose.Schema(
            {
                title: String,
                description: String,
        
            },
            {timestamps: true}
        )
    );
    return Book;
}