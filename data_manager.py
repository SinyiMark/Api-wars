import connection

@connection.connection_handler
def get_all_username(cursor):
        cursor.execute(""" 
                          select username from "users table"            
                            """, )
        all_user_name = cursor.fetchall()
        return all_user_name
