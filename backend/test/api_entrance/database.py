import os
from supabase import create_client, Client
import time

class db_habdler:
    def __init__(self):
        self.url = os.environ.get("SUPABASE_URL")
        self.key = os.environ.get("SUPABASE_KEY")
        self.tabla = "users"
        self.supabase :Client = create_client(self.url, self.key)

    #check space in the parking lot
    def check_space(self):
        response = self.supabase.table("parqueo").select("*").eq("id", 0).execute()
        capacidad = response.data[0].get("total_espacios",None)
        vehiculos_dentro = response.data[0].get("vehiculos_dentro",None)
        print(capacidad, vehiculos_dentro)
        flag = capacidad > vehiculos_dentro
        if flag:
            vehiculos_dentro += 1
            response = self.supabase.table("parqueo").update({"vehiculos_dentro":vehiculos_dentro}).eq("id", 0).execute()
            print(response.data)

        return flag
    def car_out(self):
        response = self.supabase.table("parqueo").select("*").eq("id", 0).execute()
        vehiculos_dentro = response.data[0].get("vehiculos_dentro",None)
        if vehiculos_dentro > 0:
            vehiculos_dentro -= 1
            response = self.supabase.table("parqueo").update({"vehiculos_dentro":vehiculos_dentro}).eq("id", 0).execute()
            print(response.data)
            return True
        else:
            print("No cars in the parking lot")
            return False
    
    def get_all_users(self):
        response = self.supabase.table(self.tabla).select("*").execute()
        return response.data

    def does_rfid_edxis(self, rfid:str):
        response = self.supabase.table(self.tabla).select("*").eq("uid", rfid).execute()
        print("does_rfid_exist",response.data)
        #return true or false
        return response.data != []
    
    def enough_money(self, rfid:str):
        if self.check_space() == False:
            print("No space in the parking lot")
            return 0, False

        try:
            amount = 3
            response = self.supabase.table(self.tabla).select("saldo").eq("uid", rfid).execute()
            print("enough_money",response.data)
            if len(response.data) == 0:
                print("User does not exist")
                return 0, False
            else:
                response_rol = self.supabase.table(self.tabla).select("rol").eq("uid", rfid).execute()
                rol = response_rol.data[0].get("rol",None)
                if rol == "administrador":
                    print("Admin has unlimited money")
                    return 1000, True
                else:
                    return response.data[0]["saldo"],response.data[0]["saldo"] >= amount
        except Exception as e:
            print(e)
            return 0, False
    
    
    
    def entrance(self, rfid:str):
        money, flag = self.enough_money(rfid)  
        if flag:
            #check if activa = True
            response = self.supabase.table(self.tabla).select("activa").eq("uid", rfid).execute()
            print(response.data)
            adentro = response.data[0].get("activa",None)
            if adentro:
                print("User is already inside")
                return False
            else:
                money -= 3
                #get current time in day, month, year, hour, minute, second
                current_time = time.localtime()
                formatted_time = time.strftime("%d-%m-%Y %H:%M:%S", current_time)
                user_id = self.supabase.table(self.tabla).select("id").eq("uid", rfid).execute().data[0].get("id",None)
                print(formatted_time)
                response = self.supabase.table(self.tabla).update({"saldo":money, "ultima_entrada": str(formatted_time), "activa": True}).eq("uid", rfid).execute()
                try:
                    self.supabase.table("historial").insert([{"id":int(user_id), "fecha":str(formatted_time),"accion":"entrada", "user_id":int(user_id), "uid":rfid}]).execute()
                    print("Historial updated")
                except Exception as e:
                    print(e)
                print(response.data)
                return response.data != []
        else:
            print("Not enough money")
            return False
        
        
        
    def exit(self, rfid:str):
        flag = self.does_rfid_edxis(rfid)
        #if the rfid exists
        if flag:
            #check if activa = True
            response = self.supabase.table(self.tabla).select("activa").eq("uid", rfid).execute()
            adentro = response.data[0].get("activa",None)     
            if  adentro:
                #get current time in day, month, year, hour, minute, second
                current_time = time.localtime()
                formatted_time = time.strftime("%d-%m-%Y %H:%M:%S", current_time)
                print(formatted_time)
                response = self.supabase.table(self.tabla).update({"ultima_salida": str(formatted_time), "activa": False}).eq("uid", rfid).execute()
                user_id = self.supabase.table(self.tabla).select("id").eq("uid", rfid).execute().data[0].get("id",None)
                print(response.data)
                try:
                    self.supabase.table("historial").insert([{"id":int(user_id), "fecha":str(formatted_time),"accion":"salida", "user_id":int(user_id)}]).execute()
                    print("Historial updated")
                    self.car_out()
                except Exception as e:
                    print(e)
                
                return response.data != []
            else:
                print("User is not inside")
                return False
        else:
            print("User does not exist")
            return False  
    
            
    def login(self, name:str, password:str):
        #its just a simulation of login, the email and password are in the table usuarios
        response = self.supabase.table("admins").select("*").eq("nombre", name).eq("password", password).execute()
        print(response.data)
        return response.data != []
        
     #activa significa que esta adentro, inactiva que esta afuera   
    def add_new_user(self, input: dict):
        try:
            rfid = input["uid"]
            name = input["nombre"]
            apelido = input["apellido"]
            id = input["id"]
            password = ""
            saldo = 10
            activa = False
            model = input["model"]
            response = self.supabase.table(self.tabla).insert([{"id":id,"nombre":name,"apellido":apelido,"uid":rfid, "saldo":saldo, "activa":activa, "model":model}]).execute()
            print(response.data)
            return response.data != []
        except Exception as e:
            print(e)
            return False
        
    def get_history_from_single_user(self, rfid:str):
            response = self.supabase.table("historial").select("*").eq("uid", str(rfid)).execute()
            print(response.data)
            return response.data
    
    def get_single_user(self, rfid:str):
        response = self.supabase.table(self.tabla).select("*").eq("uid", rfid).execute()
        print(response.data)
        return response.data
    
    def set_new_balance(self, rfid:str, new_balance:int):
        response = self.supabase.table(self.tabla).update({"saldo":new_balance}).eq("uid", rfid).execute()
        print(response.data)
        return response.data != []
        
    #invitadoonly has to be added to history, nothing else
    def entra_invitado(self):
        print("entra_invitado_____________")
        if self.check_space() == False:
            print("No space in the parking lot")
        else:
            current_time = time.localtime()
            formatted_time = time.strftime("%d-%m-%Y %H:%M:%S", current_time)
            print(formatted_time)
            #add to history
            response = self.supabase.table("historial").insert([{"id":0, "fecha":str(formatted_time),"accion":"entrada", "user_id":0, "uid":"invitado"}]).execute()
            #update actuve state in ivitado
            
            print(response.data, "_____________")
    def sale_invitado(self):

        current_time = time.localtime()
        formatted_time = time.strftime("%d-%m-%Y %H:%M:%S", current_time)
        print(formatted_time)
        #add to history
        response = self.supabase.table("historial").insert([{"id":0, "fecha":str(formatted_time),"accion":"salida", "user_id":0, "uid":"invitado"}]).execute()    
        print(response.data)
        self.car_out()

    def get_parking_stats(self):
        response = self.supabase.table("parqueo").select("*").eq("id", 0).execute()
        print(response.data)
        return response.data
    




