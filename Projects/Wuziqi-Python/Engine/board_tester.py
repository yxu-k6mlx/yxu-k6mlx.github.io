import chessboard

x = 0
y = 0
owner = "Black"

if __name__ == "__main__": 
    print("BEGIN OF PRINTOUT\n")
    board = chessboard.ChessboardDriver(19, 19) 
    print("Chessboard created and filled with invisible pieces. Here is the board: \n")
    board.print_board() 

    board.play(0, 0, owner=owner)
    board.print_board() 

    board.play(1, 0, owner="White")
    board.print_board() 

    board.play(0, 2, owner="White")
    board.print_board() 
    print("END OF PRINTOUT\n")