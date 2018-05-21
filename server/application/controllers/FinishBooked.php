<?php
defined('BASEPATH') OR exit('No direct script access allowed!');
use \QCloud_WeApp_SDK\Mysql\Mysql as DB;

class FinishBooked extends CI_Controller {
    public function index(){
        $json = file_get_contents("php://input"); 
        $obj = json_decode($json);
        $row = DB::update('Book_Person', ['State' => 1], ["OpenId"=>$obj->{'openId'}]);
        $row_1 = DB::row('Book_Person',['*'],["OpenId"=>$obj->{'openId'}]);
        DB::update('Time_Table_'.strval($row_1->{'DayWeek'}),["time".strval($row_1->{'Time'}+1)=>0],["place"=>$row_1->{'Place'}]);
        if ($obj->{'del'}==1)
        {
            DB::delete('BookInfo_All', ['Date' => $row_1->{'Date'},'Time'=>$row_1->{'Time'},'Place'=>$row_1->{'Place'}]);
            DB::delete('BookInfo_Place_'.strval($row_1->{'Place'}), ['Date' => $row_1->{'Date'},'Time'=>$row_1->{'Time'},'Place'=>$row_1->{'Place'}]);
        }
        if ($row==1)
        {
            $this->json([
                'code'=> 0,
            ]); 
        } else {
            $this->json([
                'code'=> 1,
            ]); 
        }
    }
}