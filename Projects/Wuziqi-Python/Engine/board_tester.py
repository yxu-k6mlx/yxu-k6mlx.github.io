import chessboard

x = 0
y = 0
owner = "Black"

if __name__ == "__main__": 
    print("BEGIN OF PRINTOUT\n")
    board = chessboard.ChessboardDriver(5, 10) 
    print("Chessboard created and filled with invisible pieces. \n")
    board.print_board() 

    board.play(0, 0, owner="Black")
    board.print_board() 

    board.play(0, 0, owner="White")
    board.print_board()

    board.play(0, 1, owner="Black")
    board.play(4, 0, owner="White")
    board.print_board() 
    print("END OF PRINTOUT\n")