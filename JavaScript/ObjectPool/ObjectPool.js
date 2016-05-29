/**
 * @File: ObjectPool.js
 * @Description: ObjectPool
 *
 * @Author:  Pury <szwzjx@gmail.com>
 * @Version: 0.0.1
 * @Date:    2016-5-18
 *
 * Copyright © 2015 - 2016 Pury <szwzjx@gmail.com>.   
 * All rights reserved.
 */
 
var PLib = PLib || {};

PLib.list = [];
PLib.pool = [];

/**
 * ObjectPool
 *
 * @class
 */
function ObjectPool()
{
	return;
}

ObjectPool.createObject = function(classFactory,type,name)
{
	var result;
	var arr = PLib.pool[type];

	if(arr != null && arr.length)
	{
		result = arr.shift();
		result.type = type;
		result.name = name;
	}
	else
	{
		result = new classFactory(type,name);
		
		switch(type)
		{
			case 0:
				break;

			case 1:
				break;

			default:
				break;
		}
	}

	PLib.list.push(result);
	return result;
};

ObjectPool.destroyObject = function(obj)
{
	var type = obj.type;

	if(PLib.pool[type] == null)
	{
		PLib.pool[type] = [];
	}

	PLib.pool[type].push(obj);
	var index = PLib.list.indexOf(obj);

	if(index != -1)
	{
		PLib.list.splice(index,1);
	}
};

//不可回收
ObjectPool.destroyObjectUnrecoverable = function(type)
{
	if(PLib.pool[type])
	{
		delete PLib.pool[type];
		console.info("[destroyObjectUnrecoverable]: type=" + type);
	}
};

PLib.ObjectPool = ObjectPool;