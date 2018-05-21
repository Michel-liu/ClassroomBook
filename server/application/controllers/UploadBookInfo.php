<?php
defined('BASEPATH') OR exit('No direct script access allowed!');
use \QCloud_WeApp_SDK\Mysql\Mysql as DB;

class UploadBookInfo extends CI_Controller {
    public function index(){
        $json = file_get_contents("php://input"); 
        $obj = json_decode($json);
        $row =  DB::row('Book_Person', ['*'], ['OpenId'=>$obj->{'openId'}]);
        $row_2 = DB::row('BookInfo_All',['*'],['Book_id'=>$obj->{'bookId'}]);
        $i_1 = "";
        $i_2 = "";
        $i_3 = "";
        $code = 0;
        if ($row == NULL&&$row_2 == NULL)
        {
            $i_1 = "row is null";
            $res = DB::insert('Book_Person',[
                'Person'=>$obj->{'headerName'},
                'OpenId'=>$obj->{'openId'},
                'Date'=>$obj->{'date'},
                'DayWeek'=>$obj->{'dayWeek'},
                'Time'=>$obj->{'time'},
                'Place'=>$obj->{'place'}
            ]);
            $res = DB::insert('BookInfo_All',[
                'Book_id'=>$obj->{'bookId'},
                'Person'=>$obj->{'headerName'},
                'Class'=>$obj->{'class'},
                'Phone'=>$obj->{'contact'},
                'Open_id'=>$obj->{'openId'},
                'Date'=>$obj->{'date'},
                'Time'=>$obj->{'time'},
                'Place'=>$obj->{'place'},
                'Title'=>$obj->{'title'}
            ]);
            if ($obj->{'place'} == 0)
            {
                $res = DB::insert('BookInfo_Place_0',[
                    'Book_id'=>$obj->{'bookId'},
                    'Person'=>$obj->{'headerName'},
                    'Class'=>$obj->{'class'},
                    'Phone'=>$obj->{'contact'},
                    'Open_id'=>$obj->{'openId'},
                    'Date'=>$obj->{'date'},
                    'Time'=>$obj->{'time'},
                    'Place'=>$obj->{'place'},
                    'Title'=>$obj->{'title'}
                ]);
                DB::update('Time_Table_'.strval($obj->{'dayWeek'}),["time".strval($obj->{'time'}+1)=>1],["place"=>0]);
            } else if ($obj->{'place'} == 1)
            {
                $res = DB::insert('BookInfo_Place_1',[
                    'Book_id'=>$obj->{'bookId'},
                    'Person'=>$obj->{'headerName'},
                    'Class'=>$obj->{'class'},
                    'Phone'=>$obj->{'contact'},
                    'Open_id'=>$obj->{'openId'},
                    'Date'=>$obj->{'date'},
                    'Time'=>$obj->{'time'},
                    'Place'=>$obj->{'place'},
                    'Title'=>$obj->{'title'}
                ]);
                DB::update('Time_Table_'.strval($obj->{'dayWeek'}),["time".strval($obj->{'time'}+1)=>1],["place"=>1]);
            } else if ($obj->{'place'} == 2)
            {
                $res = DB::insert('BookInfo_Place_2',[
                    'Book_id'=>$obj->{'bookId'},
                    'Person'=>$obj->{'headerName'},
                    'Class'=>$obj->{'class'},
                    'Phone'=>$obj->{'contact'},
                    'Open_id'=>$obj->{'openId'},
                    'Date'=>$obj->{'date'},
                    'Time'=>$obj->{'time'},
                    'Place'=>$obj->{'place'},
                    'Title'=>$obj->{'title'}
                ]);
                DB::update('Time_Table_'.strval($obj->{'dayWeek'}),["time".strval($obj->{'time'}+1)=>1],["place"=>2]);
            } else if ($obj->{'place'} == 3)
            {
                $res = DB::insert('BookInfo_Place_3',[
                    'Book_id'=>$obj->{'bookId'},
                    'Person'=>$obj->{'headerName'},
                    'Class'=>$obj->{'class'},
                    'Phone'=>$obj->{'contact'},
                    'Open_id'=>$obj->{'openId'},
                    'Date'=>$obj->{'date'},
                    'Time'=>$obj->{'time'},
                    'Place'=>$obj->{'place'},
                    'Title'=>$obj->{'title'}
                ]);
                DB::update('Time_Table_'.strval($obj->{'dayWeek'}),["time".strval($obj->{'time'}+1)=>1],["place"=>3]);
            } else if ($obj->{'place'} == 4)
            {
                $res = DB::insert('BookInfo_Place_4',[
                    'Book_id'=>$obj->{'bookId'},
                    'Person'=>$obj->{'headerName'},
                    'Class'=>$obj->{'class'},
                    'Phone'=>$obj->{'contact'},
                    'Open_id'=>$obj->{'openId'},
                    'Date'=>$obj->{'date'},
                    'Time'=>$obj->{'time'},
                    'Place'=>$obj->{'place'},
                    'Title'=>$obj->{'title'}
                ]);
                DB::update('Time_Table_'.strval($obj->{'dayWeek'}),["time".strval($obj->{'time'}+1)=>1],["place"=>4]);
            } else if ($obj->{'place'} == 5)
            {
                $res = DB::insert('BookInfo_Place_5',[
                    'Book_id'=>$obj->{'bookId'},
                    'Person'=>$obj->{'headerName'},
                    'Class'=>$obj->{'class'},
                    'Phone'=>$obj->{'contact'},
                    'Open_id'=>$obj->{'openId'},
                    'Date'=>$obj->{'date'},
                    'Time'=>$obj->{'time'},
                    'Place'=>$obj->{'place'},
                    'Title'=>$obj->{'title'}
                ]);
                DB::update('Time_Table_'.strval($obj->{'dayWeek'}),["time".strval($obj->{'time'}+1)=>1],["place"=>5]);
            } 
        } else if ($row->{'State'} == 1 && $row_2 == NULL)
        {
            $i_2 = "state is 1";
            $res = DB::update('Book_Person',[
                'Person'=>$obj->{'headerName'},
                'Date'=>$obj->{'date'},
                'DayWeek'=>$obj->{'dayWeek'},
                'Time'=>$obj->{'time'},
                'Place'=>$obj->{'place'},
                'State'=> 0
            ],['OpenId'=>$obj->{'openId'}]);
            $res = DB::insert('BookInfo_All',[
                'Book_id'=>$obj->{'bookId'},
                'Person'=>$obj->{'headerName'},
                'Class'=>$obj->{'class'},
                'Phone'=>$obj->{'contact'},
                'Open_id'=>$obj->{'openId'},
                'Date'=>$obj->{'date'},
                'Time'=>$obj->{'time'},
                'Place'=>$obj->{'place'},
                'Title'=>$obj->{'title'}
            ]);
            if ($obj->{'place'} == 0)
            {
                $res = DB::insert('BookInfo_Place_0',[
                    'Book_id'=>$obj->{'bookId'},
                    'Person'=>$obj->{'headerName'},
                    'Class'=>$obj->{'class'},
                    'Phone'=>$obj->{'contact'},
                    'Open_id'=>$obj->{'openId'},
                    'Date'=>$obj->{'date'},
                    'Time'=>$obj->{'time'},
                    'Place'=>$obj->{'place'},
                    'Title'=>$obj->{'title'}
                ]);
                DB::update('Time_Table_'.strval($obj->{'dayWeek'}),["time".strval($obj->{'time'}+1)=>1],["place"=>0]);
            } else if ($obj->{'place'} == 1)
            {
                $res = DB::insert('BookInfo_Place_1',[
                    'Book_id'=>$obj->{'bookId'},
                    'Person'=>$obj->{'headerName'},
                    'Class'=>$obj->{'class'},
                    'Phone'=>$obj->{'contact'},
                    'Open_id'=>$obj->{'openId'},
                    'Date'=>$obj->{'date'},
                    'Time'=>$obj->{'time'},
                    'Place'=>$obj->{'place'},
                    'Title'=>$obj->{'title'}
                ]);
                DB::update('Time_Table_'.strval($obj->{'dayWeek'}),["time".strval($obj->{'time'}+1)=>1],["place"=>1]);
            } else if ($obj->{'place'} == 2)
            {
                $res = DB::insert('BookInfo_Place_2',[
                    'Book_id'=>$obj->{'bookId'},
                    'Person'=>$obj->{'headerName'},
                    'Class'=>$obj->{'class'},
                    'Phone'=>$obj->{'contact'},
                    'Open_id'=>$obj->{'openId'},
                    'Date'=>$obj->{'date'},
                    'Time'=>$obj->{'time'},
                    'Place'=>$obj->{'place'},
                    'Title'=>$obj->{'title'}
                ]);
                DB::update('Time_Table_'.strval($obj->{'dayWeek'}),["time".strval($obj->{'time'}+1)=>1],["place"=>2]);
            } else if ($obj->{'place'} == 3)
            {
                $res = DB::insert('BookInfo_Place_3',[
                    'Book_id'=>$obj->{'bookId'},
                    'Person'=>$obj->{'headerName'},
                    'Class'=>$obj->{'class'},
                    'Phone'=>$obj->{'contact'},
                    'Open_id'=>$obj->{'openId'},
                    'Date'=>$obj->{'date'},
                    'Time'=>$obj->{'time'},
                    'Place'=>$obj->{'place'},
                    'Title'=>$obj->{'title'}
                ]);
                DB::update('Time_Table_'.strval($obj->{'dayWeek'}),["time".strval($obj->{'time'}+1)=>1],["place"=>3]);
            } else if ($obj->{'place'} == 4)
            {
                $res = DB::insert('BookInfo_Place_4',[
                    'Book_id'=>$obj->{'bookId'},
                    'Person'=>$obj->{'headerName'},
                    'Class'=>$obj->{'class'},
                    'Phone'=>$obj->{'contact'},
                    'Open_id'=>$obj->{'openId'},
                    'Date'=>$obj->{'date'},
                    'Time'=>$obj->{'time'},
                    'Place'=>$obj->{'place'},
                    'Title'=>$obj->{'title'}
                ]);
                DB::update('Time_Table_'.strval($obj->{'dayWeek'}),["time".strval($obj->{'time'}+1)=>1],["place"=>4]);
            } else if ($obj->{'place'} == 5)
            {
                $res = DB::insert('BookInfo_Place_5',[
                    'Book_id'=>$obj->{'bookId'},
                    'Person'=>$obj->{'headerName'},
                    'Class'=>$obj->{'class'},
                    'Phone'=>$obj->{'contact'},
                    'Open_id'=>$obj->{'openId'},
                    'Date'=>$obj->{'date'},
                    'Time'=>$obj->{'time'},
                    'Place'=>$obj->{'place'},
                    'Title'=>$obj->{'title'}
                ]);
                DB::update('Time_Table_'.strval($obj->{'dayWeek'}),["time".strval($obj->{'time'}+1)=>1],["place"=>5]);
            } 
        } else if ($row->{'State'} == 0 || $row_2 != NULL)
        {
            if ($row->{'State'} == 0)
                {
                    $i_3 = "state is 0";
                    $code = -1;
                }
            if ($row_2 != NULL)
                {
                    $code = -2;
                }
        }
        /*
         * code = 0 一切正常
         * code = -1 用户有未完成的预约
         * code = -2 时间与其他的用户冲突
         */
        $this->json([
            'code'=> $code,
            'data'=>[
                'msg' => $i_1,
                'msg_2' => $i_2,
                'msg_3' => $i_3
            ],
        ]);
    }
}