import chesspiece as piece 

class ChessboardDriver(): 
    def __init__(self, max_x, max_y, ui_board=None):
        self.max_x = max_x 
        self.max_y = max_y

        self.col = [None]*max_y
        self.board = [self.col]*max_y

        self.ui_board = ui_board 
        self.is_won = False 
        self.winner = None
        self.init_pieces() 

    """
        Initiates the chessboard by placing invisible pieces on the slots
    """
    def init_pieces(self): 
        for y in range (self.max_y): 
            for x in range(self.max_x): 
                self.board[x][y] = piece.ChesspieceDriver(owner=None)
                print("init: created a piece at (" + str(x) + ", " + str(y) + "). ")
        return 

    def get_piece_by_location(self, x, y): 
        print("Get: " + str(self.board[x][y]) + " returned")
        return self.board[x][y]
    
    """
        Survey the whole board, and prints out a formatted board to console 
        X = Black, O = White, ? = No owner
    """
    def print_board(self): 
        print("Here is your chessboard: \n")
        y = 0
        for y in range(self.max_y): 
            col_str = str(y) + " "
            for x in range(self.max_x): 
                if (self.get_piece_by_location(x, y).get_owner() is not None): 
                    if (self.get_piece_by_location(x, y).get_owner() == "Black"): 
                        col_str += " X "
                    else: 
                        col_str += " O "
                else: 
                    col_str = col_str + " ? "
            print(col_str)
            y += 1
        return 
    
    def play(self, x, y, owner=None): 
        if self.get_piece_by_location(x, y).get_owner() is not None: 
            # A piece has already been placed at (x, y) by a player
            print("(Illegal Move by " + owner + ") play: (" + str(x) + ", " + str(y) + ") is already taken by " + self.get_piece_by_location(x, y).get_owner())
        else: 
            # This spot is available 
            self.get_piece_by_location(x, y).set_owner(owner)
            print("play: New piece placed at (" + str(x) + ", " + str(y) + ")")
            
