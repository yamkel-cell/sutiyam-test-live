/* Delete sutiYam_Data table */
DROP TABLE sutiYam_Data;

/* Create a new table */
CREATE TABLE SutiYamData(
	SuitID VARCHAR(20),
    SuitName VARCHAR(255),
    SuitPrice DECIMAL(9, 2),
    SuitColor VARCHAR(255),
    SuitSize INT
);

/* Add data into SutiYamData and activate table */
USE sutiyam_db;
INSERT INTO SutiYamData 
VALUES(
    "Suit3",
    "Ladies Three Piece Suit",
    "1200.00",
    "Black",
    "26"
);

/* View Table */
SELECT * FROM SutiYamData;

CREATE DATABASE SutiYam;
USE SutiYam;
CREATE TABLE SutiYam_Products(
	ProductID INT ,
    ProductName VARCHAR (255),
    ProductDes TEXT (500),
    ProductPrice DECIMAL(10,2),
    ProductCategory VARCHAR(100),
    CreatedAt TIMESTAMP
);
SELECT * FROM SutiYam_Products;
CREATE TABLE SutiYam_Images (
	ImageID INT,
    ProductID INT,
    ImageUrl VARCHAR(255),
    IsMain BOOLEAN
);
CREATE TABLE SutiYam_Sizes (
	SizeID INT,
    ProductID INT,
    ProductSize VARCHAR(20),
    ProductColor TEXT,
    InStock INT
);