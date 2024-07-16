import chesspiece as piece 

class ChessboardDriver(): 
    def __init__(self, max_x, max_y, ui_board=None):
        self.rows = [None]*max_y
        self.cells = [self.rows]*max_x
        self.ui_board = ui_board 
        self.is_won = False 
        self.winner = None
        self.place_pieces() 

    def place_pieces(self): 
        x = 0
        y = 0
        for row in self.cells: 
            # for each row on the board
            for col in self.rows: 
                # and for each col in that row
                self.cells[x][y] = piece.ChesspieceDriver(x, y, board=self, owner=None) # place a piece with no owner
                x += 1 # goto next col
            x = 0 # reset col index back to 0
            y += 1 # goto next col
        # reset indices back to 0 just to be safe
        x = 0 
        y = 0
        return 


    def get_piece_by_location(self, x, y): 
        return self.cells[x][y] 
    
    """
        Survey the whole board, and prints out a formatted board to console 
        X = Black, O = White, ? = No owner
    """
    def print_board(self): 
        output_str = "" 
        x = 0
        y = 0
        for row in self.cells: 
            # for each row on the board
            for col in self.rows: 
                # and for each col in that row
                if self.cells[x][y].get_owner() is not None: 
                    if self.cells[x][y].get_owner() == "Black": 
                        output_str = output_str + " X "
                    else: 
                        output_str = output_str + " O "
                else: 
                    output_str = output_str + " ? "
                x += 1 # goto next col
            output_str = output_str + "\n"
            x = 0 # reset col index back to 0
            y += 1 # goto next col
        # reset indices back to 0 just to be safe
        x = 0 
        y = 0
        print("Here is the chessboard: ")
        print(output_str)
        return 
    
chessboard = ChessboardDriver(19, 19)
chessboard.print_board() 