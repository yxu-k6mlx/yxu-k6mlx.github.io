import chessboard

x = 0
y = 0
owner = "Black"

if __name__ == "__main__": 
    print("BEGIN OF PRINTOUT\n")
    board = chessboard.ChessboardDriver(19, 19) 
    print("Chessboard created and filled with invisible pieces. \n")

    board.play(0, 0, owner="Black")
    board.play(1, 1, owner="Black")
    board.play(2, 2, owner="Black")
    board.play(3, 3, owner="Black")
    board.play(4, 4, owner="Black")
    
    board.play(0, 2, owner="White")
    board.play(1, 2, owner="White")
    board.play(2, 2, owner="White")
    board.play(3, 2, owner="White")
    board.play(4, 2, owner="White")
    print("END OF PRINTOUT\n")